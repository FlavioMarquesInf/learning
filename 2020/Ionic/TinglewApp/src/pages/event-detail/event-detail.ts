import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  constructor(private navParams: NavParams, private viewCtrl:ViewController) {
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad EventDetailPage');
    const data = this.navParams.get('data');
    console.log('EventDetail',data);
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }
}
