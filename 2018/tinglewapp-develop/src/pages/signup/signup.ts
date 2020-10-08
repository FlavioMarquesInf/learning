import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, Events, AlertController } from 'ionic-angular';

import { User } from './../../models/user.interface';
import { UserProvider } from './../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  user = {
    email: 'test@example.com',
    password: '123456'
  } as User;

  // Our translated text strings
  private signupErrorString: string;
  private signupErrorString_invalid: string;
  private signupErrorString_alreadyinuse: string;
  private signupErrorString_weak: string;
  private welcomeString: string;

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public translateService: TranslateService,
    private userProvider: UserProvider,
  ) {

    this.translateService.get([
      'SIGNUP_ERROR',
      'SIGNUP_ERROR_INVALID',
      'SIGNUP_ERROR_ALREADYINUSE',
      'SIGNUP_ERROR_WEAK'
    ]).subscribe((values) => {
      this.signupErrorString = values.SIGNUP_ERROR;
      this.signupErrorString_invalid = values.SIGNUP_ERROR_INVALID;
      this.signupErrorString_alreadyinuse = values.SIGNUP_ERROR_ALREADYINUSE;
      this.signupErrorString_weak = values.SIGNUP_ERROR_WEAK;
      this.welcomeString = 'BEM VINDO $EMAIL_AQUI'; //TODO: mudar para string de tradução.
    })

    events.subscribe('login:done', () => {//TODO: chamar unsubscribe após o uso
      this._showToast(this.welcomeString);
      this.navCtrl.setRoot('TabsPage');
    });

    events.subscribe('signup:done', ()=>{
      this._showToast(this.welcomeString);
      this.navCtrl.setRoot('TabsPage');
    });

    events.subscribe('signup:error', (err) => {

      let errorString = '';

      if (err === 'auth/email-already-in-use') {
        errorString = this.signupErrorString_alreadyinuse;
        this._showPrompt();
      } else if (err === 'auth/invalid-email') {
        errorString = this.signupErrorString_invalid;
      } else if (err === 'auth/weak-password') {
        errorString = this.signupErrorString_weak;
      } else {
        errorString = this.signupErrorString;
      }
      this._showToast(errorString);
    });

  }

  doSignup(user: User) {
    this.userProvider.signupWithEmailAndPass(user);
  }

  _showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  _showPrompt() {
    //TODO: mudar as trings para variáveis de tradução
    const prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Este email já está cadastrado, deseja fazer login?",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          value: this.user.email,
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password',
          value: this.user.password,
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Sim',
          handler: data => {
            this.userProvider.loginWithEmailAndPassword(data);
          }
        }
      ]
    });
    prompt.present();
  }
}
