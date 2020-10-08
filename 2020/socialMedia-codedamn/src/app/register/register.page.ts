import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string;
  password: string;
  confirmPassword: string;

  constructor(public afAuth: AngularFireAuth, public alertController: AlertController) { }

  ngOnInit() {
    this.username = 'fulano';
    this.password = '123456';
    this.confirmPassword = '123456';
  }

  async register() {
    const { username, password, confirmPassword } = this;

    if (password !== confirmPassword) {
      return console.error('passwords don\'t match');
    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@socialApp.com', password);
      console.log(res);

    } catch (error) {
      console.dir(error);
      if (error.code === 'auth/user-not-found') {
        console.log('User not found');
      }
      if (error.code === 'auth/email-already-in-use') {
        console.log('Email already in use, please try another');
      }
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Ok']
    });
    await alert.present();



  }
}
