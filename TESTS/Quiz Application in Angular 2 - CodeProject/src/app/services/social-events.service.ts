// import { UserAuthService } from './user-auth.service';
import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';

import { User } from 'firebase';

import 'firebase/firestore';
import * as geofirex from 'geofirex';

import { NewSocialEventModel } from './../models/new-social-event.model';

import { UserLocationService } from './user-location.service';

@Injectable({
  providedIn: 'root'
})
export class SocialEventsService {

  private geo = geofirex.init(firebase);
  private radius = new BehaviorSubject(1000);
  public points: Observable<any>; // Usado para listar os eventos na tela principal
  public myPoints: Observable<any>; // Usado na tela meus eventos sociais

  public uid: string;
  private userLocation: any;

  public newSocialEvent: NewSocialEventModel;
  public updateSocialEvent: NewSocialEventModel;


  loading: any; // componente criado pelo loadingController


  constructor(
    private userLocationService: UserLocationService,
    // private userAuthService: UserAuthService,
    private angularFirestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage,
    public loadingController: LoadingController,
    // private router: Router,
  ) {
    this.initSocialEventObject();
  }

  initSocialEventObject() {
    this.newSocialEvent = {
      uid: '',
      userName: '',
      userPhoto: '',

      lat: 0,
      lng: 0,
      position: '',

      coverImage: '',
      title: '',
      category: '',
      startTime: '',
      endTime: '',
      access: '',
      ticketType: '',
      ticketPrice: 0,
      refundPolicy: '',

      fullAddress: '',
      finished: false,
    };

    this.updateSocialEvent = this.newSocialEvent; // Reset updateSocialEvent data

    this.afAuth.user.subscribe((user: User) => {
      if (user !== null) {
        // console.log('Firebase logged user:', user);
        this.newSocialEvent.uid = user.uid;
        this.updateSocialEvent.uid = user.uid;
        this.uid = user.uid;

        // TODO: buscar dados do user em "users" com uid e completar os campos "newSocialEvent.userName" e "newSocialEvent.userPhoto"
        this.newSocialEvent.userName = user.displayName;
        this.newSocialEvent.userPhoto = user.photoURL;

        this.updateSocialEvent.userName = user.displayName;
        this.updateSocialEvent.userPhoto = user.photoURL;

        // Init myPoints
        // this.userLocationService.getUserLocation().then(userLocation => {

        //   const center = this.geo.point(userLocation.lat || 0, userLocation.lng || 0);

        //   this.myPoints = this.radius.pipe(
        //     switchMap(rad => {
        //       return this.geo.collection(environment.schema.socialEvents,
        //         ref => ref.where('finished', '==', false).where('uid', '==', user.uid)
        //       ).within(center, rad, 'position');
        //     })
        //   );
        // });

      } else {
        // TODO: navegar de volta para login
        // this.router.navigateByUrl('/login');
      }
    });

    this.userLocationService.getUserLocation().then(userLocation => {
      this.userLocation = userLocation;
    }).then(() => {

      this.newSocialEvent.lat = this.userLocation.lat;
      this.newSocialEvent.lng = this.userLocation.lng;

      this.updateSocialEvent.lat = this.userLocation.lat;
      this.updateSocialEvent.lng = this.userLocation.lng;

      const todayDate = new Date();
      const tomorrowDate = new Date();
      tomorrowDate.setHours(todayDate.getHours() + 8);

      this.newSocialEvent.startTime = todayDate.toISOString().toString();
      this.newSocialEvent.endTime = tomorrowDate.toISOString().toString();

      this.updateSocialEvent.startTime = todayDate.toISOString().toString();
      this.updateSocialEvent.endTime = tomorrowDate.toISOString().toString();

      this.init();

    });


  }

  updateRadius(v: number) {
    this.radius.next(v);
  }

  async init() {
    const center = this.geo.point(this.userLocation.lat || 0, this.userLocation.lng || 0);

    this.points = this.radius.pipe(
      switchMap(rad => {
        return this.geo.collection(environment.schema.socialEvents,
          ref => ref.where('finished', '==', false).limit(1000)
        ).within(center, rad, 'position');
      })
    );


    // this.updateRadius(1000);
    // this.points.subscribe(res => {
    //   console.log('-Points:', res);
    // });

    this.myPoints = this.radius.pipe(
      switchMap(rad => {
        return this.geo.collection(environment.schema.socialEvents,
          ref => ref.where('finished', '==', false).where('uid', '==', this.uid).limit(1000)
        ).within(center, rad, 'position');
      })
    );
    // this.myPoints.subscribe(console.log);
  }

  async remove(socialEvent) {
    console.log('Remove social event:', socialEvent);

    // TODO: remover evento pelo ID e remover a imagem vinculada
    const id = socialEvent.id;


    // DONE: remover imagem
    const socialEventRef = this.angularFirestore.doc<any>(environment.schema.socialEvents + '/' + id);
    socialEventRef.delete().then(() => {
      console.log('Event deleted');

      const socialEventImageRef = this.afStorage.ref(environment.schema.socialEventImages).child(id + '/coverImage');

      socialEventImageRef.delete().then(() => {
        console.log('Document successfully deleted!');
        // TODO: deletar imagem aqui
      }).catch(error => {
        console.error('Error removing document: ', error);
      });
    });





  }

  async add(socialEvent: NewSocialEventModel) {
    this.presentLoading('Quase pronto...');
    // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const nowTimestamp = new Date().getTime();
    // const myDate = new Date(nowTimestamp * 1000);
    // const formatedTime = myDate.toJSON();

    const point = this.geo.point(socialEvent.lat, socialEvent.lng);

    const newSocialEvent = {
      uid: socialEvent.uid,
      userPhoto: socialEvent.userPhoto || './assets/img/user-thumbnail-placeholder.png',
      userName: socialEvent.userName,

      position: point.data,

      lat: socialEvent.lat,
      lng: socialEvent.lng,

      title: socialEvent.title,
      description: socialEvent.description || '',
      category: socialEvent.category,
      startTime: socialEvent.startTime.toString(),
      endTime: socialEvent.endTime.toString(),
      shortAddress: socialEvent.shortAddress || '',
      fullAddress: socialEvent.fullAddress || '',
      coverImage: socialEvent.coverImage || './assets/img/image-placeholder.gif',
      tags: socialEvent.tags,
      access: socialEvent.access,
      ticketType: socialEvent.ticketType,
      ticketPrice: socialEvent.ticketPrice,
      refundPolicy: socialEvent.refundPolicy,
      finished: false,
      created: nowTimestamp
    };

    console.log(' * Objeto newSocialEvent prepararo para ser salvo:', newSocialEvent);

    const socialEvents = this.geo.collection(environment.schema.socialEvents);
    await socialEvents.add(newSocialEvent)
    .then(doc => {

      setTimeout(async () => {
        let imageULR = '';
        if (socialEvent._imageData !== '') {
          imageULR = await this.uploadImage(socialEvent._imageData, doc.id);
          doc.set({ coverImage: imageULR }, { merge: true }).then(() => {
            console.log('Social event:' + doc.id + ' image path updated.');
          });
        }

        this.initSocialEventObject();

        this.loading.dismiss();
        // this.router.navigate(['/tabs']);
      }, 1);

      // console.log(doc);
      // console.log(doc.id);

    }).catch(error => {
      console.log(error);
    });

  }

  // TODO: update social event
  async update(socialEvent) {

    this.presentLoading('Quase pronto...');

    const nowTimestamp = new Date().getTime();

    const point = this.geo.point(socialEvent.lat, socialEvent.lng);

    const docId = socialEvent.id;

    const editedSocialEvent = {
      uid: socialEvent.uid,
      userPhoto: socialEvent.userPhoto || './assets/img/user-thumbnail-placeholder.png',
      userName: socialEvent.userName,

      position: point.data,

      lat: socialEvent.lat,
      lng: socialEvent.lng,

      title: socialEvent.title,
      description: socialEvent.description || '',
      category: socialEvent.category,
      startTime: socialEvent.startTime.toString(),
      endTime: socialEvent.endTime.toString(),
      shortAddress: socialEvent.shortAddress || '',
      fullAddress: socialEvent.fullAddress || '',
      coverImage: socialEvent.coverImage || './assets/img/image-placeholder.gif',
      tags: socialEvent.tags,
      access: socialEvent.access,
      ticketType: socialEvent.ticketType,
      ticketPrice: socialEvent.ticketPrice,
      refundPolicy: socialEvent.refundPolicy,
      finished: socialEvent.finished,
      created: nowTimestamp
    };

    const socialEventCollection = this.geo.collection(environment.schema.socialEvents);
    // TODO: A partir daqui preciso alterar
    // collection.setPoint(id, field, lat, lng)
    // collection.setDoc(id, data) ... acho que vou usar este.

    setTimeout(async () => {
      let imageULR = '';
      if (socialEvent._imageData !== '') {
        try {
          imageULR = await this.uploadImage(socialEvent._imageData, docId);
          editedSocialEvent.coverImage = imageULR;
        } catch (error) {
          console.error(error);
        }
      }

      console.log(' * Objeto editedSocialEvent prepararo para ser atualizado:', editedSocialEvent);

      await socialEventCollection.setDoc(docId, editedSocialEvent)
        .then(doc => {
          console.log(doc);
          // console.log(doc.id);
          // this.initSocialEventObject();
          this.loading.dismiss();
        }).catch(error => {
          console.log(error);
        });

    }, 1);

  }


  __randomMarkersGenerate(markersAmount = 1, position) {
    const radius = 0.5;

    const minLat = position.lat - radius;
    const maxLat = position.lat + radius;
    const minLng = position.lng - radius;
    const maxLng = position.lng + radius;

    // console.warn('Lat', minLat, maxLat);
    // console.warn('Lng', minLng, maxLng);

    const locations = [];

    for (let i = 0; i < markersAmount; i++) {
      const newlat = (Math.random() % (maxLat + 1 - minLat)) + minLat;
      const newlng = (Math.random() % (maxLng + 1 - minLng)) + minLng;
      locations.push({ lat: newlat, lng: newlng, eventTitle: 'Evento @Tinglew ' + (i + 1) });
    }
    console.log(locations);

    // Save social event into firestore
    locations.forEach(location => {
      console.log(location);
      const point = this.geo.point(location.lat, location.lng);
      const d = new Date();

      this.add({
        title: location.eventTitle,
        lat: location.lat,
        lng: location.lng,
        coverImage: './assets/img/image-placeholder.gif',
        position: point.data,
        description: 'Tinglew test-event',
        category: 'Tinglew-test',
        userPhoto: './assets/img/user-thumbnail-placeholder.png',
        userName: 'Tinglew',
        startTime: d.toLocaleString(),
        endTime: d.setHours(d.getHours() + 8).toLocaleString(),
        shortAddress: '',
        fullAddress: '',
        tags: [''],
        finished: false,
        access: '',
        ticketType: ''
      });
    });

  }

  private async uploadImage(imageData, id): Promise<any> {

    return new Promise((resolve, reject) => {

      const timestamp = new Date().getTime().toString();
      const picRef = this.afStorage.ref(environment.schema.socialEventImages).child(id).child('coverImage');

      const uploadTask = picRef.putString(imageData/*.substring(23)*/, 'data_url', { contentType: 'image/jpeg' });

      uploadTask.then(uploadedImage => {
        // console.log('uploaded image.', uploadedImage);
        uploadedImage.ref.getDownloadURL().then(function (downloadURL) {
          // console.log('File available at', downloadURL);
          resolve(downloadURL);
        });

      });

    });
  }

  async presentLoading(message) {
    this.loading = await this.loadingController.create({
      message: message,
      duration: 10000
    });
    return await this.loading.present();
  }

}
