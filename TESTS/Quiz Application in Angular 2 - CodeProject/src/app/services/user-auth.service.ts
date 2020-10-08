import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

import { environment } from '../../environments/environment';
import { AngularFirestore, DocumentSnapshotExists, DocumentSnapshotDoesNotExist } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Action } from '@angular/fire/database';

import { LoginModel } from './../models/login.model';
import { SignupModel } from '../models/signup.model';

// OBS: tive que usar any no lugar do tipo "UserData", pois na hora de atribuir o objeto a variável com este tipo,
// aparece uma mensagem dizendo que o campo 'photo' não existe no resultado, mas ao conferir o objeto no console a propriedade está lá;

// import { UserData } from './../models/user-data.model';
import { User } from 'firebase';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  public user: Observable<User>; // Firebase observable of logged user;

  public userData: any; // Extra info. Ex: sexo biológico, orientação sexual e idade;
  public uid: string;

  public loading: any;
  public uploadProgress: any;

  constructor(
    private router: Router,
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private afFirestore: AngularFirestore,
    private afStorage: AngularFireStorage,
    public loadingController: LoadingController,
  ) {
    this.user = afAuth.authState;

    this.user.subscribe((user: User) => {
      if (user !== null) {
        // console.log('Firebase logged user:', user);
        this.uid = user.uid;

        // DONE: buscar dados no banco em "/users/$uid"
        // this.presentLoading('Quase pronto...');
        this.loadUserData(this.uid)
          .then(() => {
            // console.log(this.uid);
            console.log(this.userData);
            // this.router.navigate(['/tabs']);
          });
      } else {
        this.uid = null;
        this.userData = null;
        this.storage.remove('userData');
        // this.router.navigate(['/login']);
      }
    });
  }


  public getUserInfo() {
    // DONE: aqui o user deve ser obtido através do firestore em "users/$uid" ao invés do subscribe,
    //    pois na base de dados contem também informações extras como "sexualOrientation" e "bioSex";
    return this.userData !== null ? this.userData : null;
  }


  public async signupWithEmailAndPassword(signupData: SignupModel): Promise<any> {
    this.presentLoading('Quase pronto...');
    return await this.afAuth.auth.createUserWithEmailAndPassword(signupData.email, signupData.password)
      .then(res => res.user)
      .then(async newUser => {
        this.uid = newUser.uid;

        let imageULR = './assets/img/image-placeholder.gif';
        if (signupData.photoData !== './assets/img/image-placeholder.gif') {
          try {
            imageULR = await this.uploadImage(signupData.photoData, newUser.uid);
          } catch (error) {
            console.error(error);
          }
        }

        // TODO: verificar se o displayName e photoUrl estão vazios antes de atualizar;
        // Update google user profile
        newUser.updateProfile({
          displayName: signupData.name,
          photoURL: imageULR
        }).then(() => {
          console.log('Profile Updated');

          this.createUserProfile(newUser, signupData);

          // DONE: fechar loader
          if (this.loading) {
            this.loading.dismiss();
          }
        }).catch(error => {
          console.error(error);
        });



        // this.loggedUser = newUser;
        // this.events.publish('signup:done');
        // this.router.navigate(['/app/tabs/(home:home)']);

      }).catch(error => {
        if (this.loading) {
          this.loading.dismiss();
        }

        console.error(error);
        return error;
      });
  }

  public async loginWithEmailAndPassword(loginData: LoginModel): Promise<any> {
    // DONE: iniciar loader
    this.presentLoading('Quase pronto...');
    return this.afAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password)
      .then(res => res.user)
      .then(async (userData: User) => {
        this.uid = userData.uid;

        // DONE: buscar user em "users/$uid" através do "this.uid"
        await this.loadUserData(this.uid);

        this.router.navigateByUrl('/app/tabs/(home:home)');

      }).catch(error => {
        this.loading.dismiss();
        console.error(error);
        return error;
      });

  }

  private loadUserData(uid) {
    // DONE: preencher "this.userData" com o retorno da busca;
    return new Promise((resolve, reject) => {

      const userDocRef = this.afFirestore.collection(environment.schema.users).doc(this.uid);

      userDocRef.valueChanges().pipe(
        take(1),
        tap((data: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<any>>) => {
          // console.log(`Loaded Document`, data);
          if (data !== null) {
            this.userData = data;
            return data;
          } else {
            return null;
          }
        }),
      ).subscribe(data => {
        // console.log('data', data);
        if (data) {
          this.setUserOnLocalStorage(data);
        }

        // DONE: fechar loader
        if (this.loading) {
          this.loading.dismiss();
        }
        resolve(data);
      });

    });

  }


  public logout(): void {
    this.afAuth.auth.signOut()
      .then(() => {
        console.log('User logged out.');
        this.uid = null;
        this.userData = null; // Component Var
        this.storage.remove('userData');
        // this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error(error);
      });
  }

  private createUserProfile(newUser: User, signupData: SignupModel) {

    const userRef = this.afFirestore.collection(environment.schema.users).doc(newUser.uid);

    const newUserData = {
      uid: newUser.uid,
      name: newUser.displayName,
      email: newUser.email,
      photo: newUser.photoURL || './assets/img/user-thumbnail-placeholder.png',

      birth: signupData.birth,
      sexualOrientation: signupData.sexualOrientation,
      bioSex: signupData.bioSex,
    };

    // DONE: iniciar loader
    this.presentLoading('Quase pronto...');
    const setWithMerge = userRef.set(newUserData, { merge: true });

    setWithMerge.then(() => {
      console.log('User created into firestore.');
      this.userData = newUserData;

      this.setUserOnLocalStorage(newUserData);

      // DONE: remover o loader da tela para liberar o usuário para que possa criar eventos
      if (this.loading) {
        this.loading.dismiss();
      }
    })
      .catch(error => console.error(error));
  }

  private async uploadImage(imageData, uid): Promise<any> {

    return new Promise(async (resolve, reject) => {
      try {
        const timestamp = new Date().getTime().toString();
        const storagePicRef = this.afStorage.ref(environment.schema.profileImages).child(uid).child(timestamp);

        const uploadTask = storagePicRef.putString(imageData/*.substring(23)*/, 'data_url', { contentType: 'image/jpeg' });

        this.uploadProgress = await uploadTask.percentageChanges(); // OBS: esse método não funcionou

        uploadTask.then(uploadedImage => {
          // console.log('uploaded image.', uploadedImage);
          uploadedImage.ref.getDownloadURL().then(function (downloadURL) {
            // console.log('File available at', downloadURL);
            resolve(downloadURL);
          });
        });

      } catch (error) {
        reject(error);
        console.error(error);
      }

    });
  }

  private async setUserOnLocalStorage(newUser) {
    await this.storage.set('userData', newUser);
  }

  public async getUserFromLocalStorage() {
    return await this.storage.get('userData').then(userData => {
      return userData;
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
