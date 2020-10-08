import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SocialEventsProvider } from './../../providers/social-events/social-events';

@IonicPage()
@Component({
  selector: 'page-social-events-list',
  templateUrl: 'social-events-list.html',
})
export class SocialEventsListPage {

  socialEvents: any[]=[];
  searchRadiusKm: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private socialEventsProvider: SocialEventsProvider,
    private loadingCtrl: LoadingController,
  ) {

  }

  ionViewDidLoad() {
    setTimeout(()=>{
      this.loadNearbySocialEvents();
    },1000);
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Quase pronto...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
    return loading;
  }

  loadNearbySocialEvents() {
    let loading = this.presentLoadingDefault();
    this.socialEventsProvider.getNearbyEvents();
    setTimeout(() => {
      this.socialEvents = this.socialEventsProvider.nearbySocialEvents$;
      //console.log('Array de eventos', this.socialEvents);
      this.searchRadiusKm = this.socialEventsProvider.minSearchRadius;
      loading.dismiss();

    }, 3000);
  }

  switchTabs() {
    this.navCtrl.parent.select(2);
  }

  doSomething(){
    console.log('Something is done.');
  }
}
