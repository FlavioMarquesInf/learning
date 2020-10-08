import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../models/user.interface';

@Injectable()
export class UserProvider {
  // Our local user object
  public user: any;

  errorString: string

  constructor(
    public events: Events,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private storage: Storage,
  ) {}

  async loginWithEmailAndPassword(user: any) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        .then(res => res.user)
        .then(userData => {
          this.setUserOnLocalStorage(userData);
          this.events.publish('login:done');
        });

      } catch (err) {
      console.error('Error attempting to login:', err);
      this.events.publish('login:error', err.code);
    }
  }

  async signupWithEmailAndPass(user: User) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(res => res.user)
        .then(newUser => {
          this.createDatabaseProfile(newUser);
          this.setUserOnLocalStorage(newUser);
          this.events.publish('signup:done');
        });
    } catch (err) {
      console.error('Error attempting to signin:', err);
      this.events.publish('signup:error', err.code);
    }
  }

  createDatabaseProfile(userData: any) {
    try {
      if (userData !== undefined) {
        this.afDatabase.object(`users/${userData.uid}`).set({
          uid: userData.uid,
          email: userData.email,
          // emailVerified: userData.emailVerified || '',
          // isAnonymous: userData.isAnonymous || '',
          // displayName: userData.displayName || '',
          // createdAt: userData.createdAt || '',
          // lastLoginAt: userData.lastLoginAt || '',
          // apiKey: userData.apiKey || '',
          // authDomain: userData.authDomain || '',
          providerData: userData.providerData || '',
          // phoneNumber: userData.phoneNumber || '',
          photoURL: userData.photoURL || '', //TODO: colocar placeholder de imagem aqui ao invés de vazio;
          // stsTokenManager: userData.stsTokenManager || '',
        });
      } else {
        console.error('The function "createDatabaseProfile(userData: any){...}" must receive a User.');
      }
    } catch (err) {
      console.error('Firebase error: ', err);
    }
  }

  setUserOnUserProviderVar_user(userData: any): void {
    this.user = userData;
  }

  setUserOnLocalStorage(userData: any): void {
    this.storage.set('userData', JSON.stringify(userData));
  };

  logout() {
    this.afAuth.auth.signOut();
    this.storage.remove('userData'); //Storage
    this.user = null; // Component Var
    this.events.publish('user:loggedOut');
  }


  async getUid() {
    let user = await this.storage.get('userData').then(userData => JSON.parse(userData) );
    console.log(user);

    if (user !== null) {
      return user.uid;
    } else {
      return false;
    }

    /* LER DADOS UMA VEZ
    var userId = this.afAuth.auth.currentUser.uid;

    return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      // ...
    });
    */

  }
}
