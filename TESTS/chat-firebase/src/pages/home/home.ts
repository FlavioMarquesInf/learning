import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/umd';

import { SignupPage } from '../signup/signup';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController) {}

  doSignup(): void {
    this.navCtrl.push(SignupPage);
  }

}
