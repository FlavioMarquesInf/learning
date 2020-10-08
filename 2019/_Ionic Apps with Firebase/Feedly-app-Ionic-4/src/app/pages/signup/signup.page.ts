import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  name = '';
  email = '';
  password = '';

  constructor(
    private afAuth: AngularFireAuth,
    public toastController: ToastController,
    public alertController: AlertController,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  signup() {
    // console.log(this.name, this.email, this.password);
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(authData => {
      console.log('Usuário criado com sucesso!', authData);

      const newUser: firebase.User = authData.user;
      newUser.updateProfile({
        displayName: this.name,
        photoURL: ''
      }).then(() => {
        // console.log('perfil atualizado com sucesso!');
        this.presentAlert();
        this.router.navigateByUrl('/feed');
      }).catch(error => {
        console.error(error);
        this.presentToast(error.message);
      });

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
      closeButtonText: 'Ok',
      // color: 'red'
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Account Created',
      // subHeader: 'Subtitle',
      message: 'Your account has been created successfully.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
