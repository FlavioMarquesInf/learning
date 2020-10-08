import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, Events } from 'ionic-angular';

import { User } from './../../models/user.interface';
import { UserProvider } from './../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user = {
    email: 'test@example.com',
    password: '123456'
  } as User;


  // Our translated text strings
  private loginErrorString: string;
  private loginErrorString_wrong: string;
  private errorString: string;

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private userProvider: UserProvider,
  ) {

    this.translateService.get(
      [
      'LOGIN_ERROR',
      'LOGIN_ERROR_WRONG',
      ]
    ).subscribe((values) => {
      this.loginErrorString = values.LOGIN_ERROR;
      this.loginErrorString_wrong = values.LOGIN_ERROR_WRONG;
    });

    events.subscribe('login:done', () => {//TODO: chamar unsubscribe após o uso
      this.navCtrl.setRoot('TabsPage');
    });

    events.subscribe('login:error', (err) => {//TODO: chamar unsubscribe após o uso
      let errorString = '';
      if (err === 'auth/wrong-password') {
        errorString = this.loginErrorString_wrong;
      } else if (err === 'auth/user-not-found') {
        errorString = 'Usuário não encontrado.'//TODO: criar variável de tradução
      } else {
        errorString = this.loginErrorString;
      }
      this._showToast(errorString);
    });
  }

  doLogin(user: User) {
    this.userProvider.loginWithEmailAndPassword(user);
  }

  _showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
