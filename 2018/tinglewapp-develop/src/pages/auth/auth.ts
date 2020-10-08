import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from './../../models/user.interface';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  user = {
    email: 'test@example.com',
    password: '123456'
  } as User;


  // Our translated text strings
  private loginErrorString: string;
  private loginErrorString_wrong: string;

  private signupErrorString: string;
  private signupErrorString_invalid: string;
  private signupErrorString_alreadyinuse: string;
  private signupErrorString_weak: string;
  private welcomeString: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateService: TranslateService,
  ) {

    this.translateService.get(
      [
        'LOGIN_ERROR',
        'LOGIN_ERROR_WRONG',
        'SIGNUP_ERROR',
        'SIGNUP_ERROR_INVALID',
        'SIGNUP_ERROR_ALREADYINUSE',
        'SIGNUP_ERROR_WEAK',
      ]
    ).subscribe((values) => {
      this.loginErrorString = values.LOGIN_ERROR;
      this.loginErrorString_wrong = values.LOGIN_ERROR_WRONG;

      this.signupErrorString = values.SIGNUP_ERROR;
      this.signupErrorString_invalid = values.SIGNUP_ERROR_INVALID;
      this.signupErrorString_alreadyinuse = values.SIGNUP_ERROR_ALREADYINUSE;
      this.signupErrorString_weak = values.SIGNUP_ERROR_WEAK;
      this.welcomeString = 'BEM VINDO $EMAIL_AQUI'; //TODO: mudar para string de tradução.
    });
  }

  ionViewDidLoad() {

  }

}
