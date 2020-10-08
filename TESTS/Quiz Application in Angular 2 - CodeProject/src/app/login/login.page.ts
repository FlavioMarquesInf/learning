import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';
import { LoginModel } from './../models/login.model';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginData: LoginModel;

  params = {
    'invalid-argument': 'Erro: Um argumento inválido foi fornecido.',
    'invalid-disabled-field': 'Erro: O valor fornecido para a propriedade de usuário é inválido.',
    'auth/email-already-in-use': 'Erro: O e-mail fornecido já está sendo usado por outra conta.',
    'auth/wrong-password': 'Erro: Senha inválida ou o usuário não tem uma senha.',
  } as MessagesIndex;


  constructor(
    private googlePlus: GooglePlus,
    private router: Router,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.loginData = { email: 'flavio.marques.inf@gmail.com', password: '123456' };
  }

  login() {
    if (this.platform.is('cordova')) {

      this.googlePlus.login({})
        .then(res => {
          console.log(res);
          const userId = res.userId;

          this.router.navigateByUrl('/map');
        })
        .catch(err => console.error(err));

    } else {
      console.log('aqui vai o codigo do login');
      this.router.navigateByUrl('/map');
    }


  }

}

export interface MessagesIndex {
  [index: string]: string;
}
