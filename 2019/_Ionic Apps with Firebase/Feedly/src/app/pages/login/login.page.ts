import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
// import firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = 'flavio.marques.inf@gmail.com';
  password = '123456';
  constructor(
    private afAuth: AngularFireAuth,
    public toastController: ToastController,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(authData => {
      // console.log(authData);
      this.presentToast('Bem vindo ' + authData.user.displayName);
      this.router.navigate(['/feed']);
    }).catch(error => {
      console.error(error);
      this.presentToast(error.message);
    });
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 4000,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
}
