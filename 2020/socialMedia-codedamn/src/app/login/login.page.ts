import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string;
  password: string;

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.username = 'fulano';
    this.password = '123456';
  }

  async login() {

    const { username, password } = this;

    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@socialApp.com', password);
      console.log(res);

    } catch (error) {
      console.dir(error);
      if (error.code === 'auth/user-not-found') {
        console.log('User not found');
        
      }
    }
  }
}
