import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
// import moment from 'moment';
import { Router } from '@angular/router';

import { CommentsPage } from './../comments/comments.page';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  text = '';
  items: Observable<any[]>;
  posts: any[] = [];

  pageSize = 10;
  cursor: any;

  infiniteEvent: any;

  image: string;

  constructor(
    public db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private camera: Camera,
    private http: HttpClient,
  ) {
    // this.items = db.collection('posts').valueChanges();

    // this.items.subscribe(data => {
    //   console.log(data);
    // });

    console.log(this.pageSize);

  }

  ngOnInit() {
    this.getPosts();
  }

  post() {
    this.db.collection('posts').add({
      text: this.text,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      owner: this.afAuth.auth.currentUser.uid,
      owner_name: this.afAuth.auth.currentUser.displayName
    }).then(async doc => {
      console.log(doc);

      if (this.image) {
        await this.upload(doc.id);
      }

      this.text = '';
      this.image = undefined;

      const toast = await this.toastCtrl.create({
        message: 'Your post have been created successfully.',
        duration: 3000
      });
      toast.present();

      this.getPosts();

    }).catch(error => {
      console.log(error);
    });
  }

  async getPosts() {
    this.posts = [];

    const loading = await this.loadingCtrl.create({
      message: 'Loading Feed...'
    });

    await loading.present();

    const query = firebase.firestore().collection('posts').orderBy('created', 'desc').limit(this.pageSize);

    query.onSnapshot((snapshot) => {
      const changedDocs = snapshot.docChanges();

      changedDocs.forEach(change => {
        if (change.type === 'added') {
          // TODO
        }

        if (change.type === 'modified') {
          // TODO
          console.log('Document with id ' + change.doc.id + ' has been modified.');
          for (let i = 0; i < this.posts.length; i++) {
            if (this.posts[i].id === change.doc.id) {
              this.posts[i] = change.doc;
            }

          }
        }

        if (change.type === 'removed') {
          // TODO
        }

      });
    });

    query.get()
    .then(docs => {
      docs.forEach(doc => {
        this.posts.push(doc);
      });

      loading.dismiss();

      this.cursor = this.posts[this.posts.length - 1];

      console.log(this.posts);

    });
  }

  ago(time) {
    // const difference = moment(time).diff(moment());
    // return moment.duration(difference).humanize();
    return time;
  }

  loadMorePosts(event) {
    firebase.firestore().collection('posts')
    .orderBy('created', 'desc')
    .startAfter(this.cursor)
    .limit(this.pageSize).get()
      .then(docs => {
        docs.forEach(doc => {
          this.posts.push(doc);
        });

        console.log(this.posts);

        if (docs.size < this.pageSize) {
          // all documents have been loaded
          event.target.disabled = true;
          this.infiniteEvent = event;
        } else {
          this.cursor = this.posts[this.posts.length - 1];
          event.target.complete();
        }

      }).catch(error => {
        console.error(error);
      });

  }

  refresh(event) {
    this.posts = [];
    this.getPosts();
    if (this.infiniteEvent) {
      this.infiniteEvent.target.disabled = false;
    }
    event.target.complete();

  }

  logout() {
    this.afAuth.auth.signOut().then(async () => {
      const toast = await this.toastCtrl.create({
        message: 'You have been logged out successfully.',
        duration: 3000
      });
      toast.present();
      this.router.navigate(['/login']);
    });
  }

  addPhoto() {
    this.launchCamera();

  }

  launchCamera() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetHeight: 512,
      targetWidth: 512,
      allowEdit: true,
    };

    this.camera.getPicture(options).then(base64Image => {
      console.log(base64Image);
      this.image = 'data:image/png;base64,' + base64Image;
    }).catch(error => {
      console.log(error);
    });
  }

  upload(name: string) {
    return new Promise(async (resolve, reject) => {
      const loading = await this.loadingCtrl.create({
        message: 'Uploading image...'
      });

      const ref = this.afStorage.ref('postImages/' + name);
      const uploadTask = ref.putString(this.image.split(',')[1], 'base64');

      uploadTask.task.on('state_changed', (taskSnapshot: any) => {
        console.log(taskSnapshot);
        const percentage = taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100;
        loading.message = 'Uploaded ' + percentage.toString() + '% ...';
      }, error => {
        console.log(error);
      }, () => {
        console.log('The upload is complete!');

        uploadTask.task.snapshot.ref.getDownloadURL().then(url => {
          this.db.collection('posts').doc(name).update({
            image: url
          }).then(() => {
            loading.dismiss();
            resolve();
          }).catch(error => {
            loading.dismiss();
            reject();
          });

        }).catch(error => {
          loading.dismiss();
          reject();
        });
      });


    });
  }

  async like(post) {
    const body = {
      postId: post.id,
      userId: firebase.auth().currentUser.uid,
      action: post.data().likes && post.data().likes[firebase.auth().currentUser.uid] === true ? 'unlike' : 'like'
    };

    console.log(body);

    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');


      const toast = await this.toastCtrl.create({
        message: 'Updating like... Please wait.'
      });
      toast.present();

    // OBS: o (responseType: 'text') impede que a resposta seja parseada como json,
    // evitando erro, pois nesse caso a resposta é uma string apenas e não um objeto json.
    const url = 'https://us-central1-feedly-5d2b1.cloudfunctions.net/updateLikesCount';
    this.http.post(url, body, {
      headers: headers,
      responseType: 'text',
    }).subscribe(data => {
      console.log(data);
      toast.message = 'Like updated!';
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }, error => {
      toast.message = 'An error has occured. Please try again later.';
      console.log(error);
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    });

  }

  async showAllCommentsModal(post) {
    const modal = await this.modalCtrl.create({
      component: CommentsPage,
      componentProps: {
        'post': post,
      }
    });
    await modal.present();
  }

  async comment(post) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
      {
        text: 'View All Comments',
        icon: 'eye',
        handler: () => {
          this.showAllCommentsModal(post);
        }
      }, {
        text: 'New Comment',
        icon: 'add',
        handler: async () => {
          console.log('View all comments');
          const alert = await this.alertCtrl.create({
            header: 'Type your comment',
            inputs: [
              {
                name: 'comment',
                type: 'text',
                placeholder: 'Your comment...'
              }
            ],
            buttons: [
              {
                text: 'Cancel'
              }, {
                text: 'Post',
                handler: (data) => {
                  if (data.comment) {
                    this.db.collection('comments').add({
                      text: data.comment,
                      post: post.id,
                      owner: this.afAuth.auth.currentUser.uid,
                      owner_name: this.afAuth.auth.currentUser.displayName,
                      created: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(async doc => {
                      const toast = await this.toastCtrl.create({
                        message: 'Comment posted successfully. ' + doc.id,
                        duration: 3000
                      });
                      await toast.present();

                    }).catch(async error => {
                      console.log(error);
                      const toast = await this.toastCtrl.create({
                        message: error.message,
                        duration: 3000
                      });
                      await toast.present();
                    });
                  }
                }
              }
          ]
          });
          await alert.present();
        }
      }]
    });

    await actionSheet.present();
  }

}
