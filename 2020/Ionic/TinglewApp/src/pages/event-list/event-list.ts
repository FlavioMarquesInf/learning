import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {
  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.items.push({ name:'Flavio'});
    this.items.push({ name:'Marques'});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
  }

}
