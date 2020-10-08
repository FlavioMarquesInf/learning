import { UserProvider } from './../../providers/user/user';
import { SocialEventsProvider } from './../../providers/social-events/social-events';
import { LocationProvider } from './../../providers/location/location';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  items: any[] = [];

  geoFireRef$: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private locationProvider: LocationProvider,
    private socialEventsProvider: SocialEventsProvider,
    private userProvider: UserProvider,
    private af: AngularFireDatabase,
  ) { }

  test() {
    this.userProvider.getUid();

  }

}
