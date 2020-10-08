import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Camera } from '@ionic-native/camera';
import { SocialEvent } from './../../models/social-event.interface';
import { GOOGLE_MAPS_API_KEY } from './../../app/app.googlemaps.apikey';
import { SocialEventsProvider } from './../../providers/social-events/social-events';


@IonicPage()
@Component({
  selector: 'page-new-social-event',
  templateUrl: 'new-social-event.html',
})
export class NewSocialEventPage {
  navParam: any;
  staticMapUrl: string;

  socialEvent = {} as SocialEvent;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialEventsProvider: SocialEventsProvider) {

  }

  ionViewDidLoad() {
    // Prepare static google map
    this.navParam = this.navParams.get('markerData');

    this.socialEvent.lat = this.navParam.getPosition().lat();
    this.socialEvent.lng = this.navParam.getPosition().lng();

    this.staticMapUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
      this.socialEvent.lat + ', ' + this.socialEvent.lng + '&zoom=17&size=400x200&maptype=roadmap%20&markers=color:green%7Clabel:E%7C' +
      this.socialEvent.lat + ', ' + this.socialEvent.lng + '&key=' + GOOGLE_MAPS_API_KEY;
  }

  createNewSocialEvent(socialEvent: SocialEvent) {
    this.socialEventsProvider.createNewSocialEvent(socialEvent).then(()=> {
      //TODO: avisar usuário sobre a criação com um toast

      this.navCtrl.pop()
    }
    );
  }

  eventDetail(marker) {
    alert(marker.key);
  }
}
