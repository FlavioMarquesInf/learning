import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-second',
  templateUrl: 'second.html',
})
export class SecondPage {
  message: string;
  constructor(private navCtrl: NavController, private navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecondPage');
    this.message = this.navParams.get('message');
    // alert(this.message)

  }

  navigateBack(): void {
    this.navCtrl.pop();
  }

  navigateToTheThirdPage(): void {
    this.navCtrl.push('ThirdPage');
  }
}
