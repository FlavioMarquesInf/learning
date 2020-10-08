import { GOOGLE_MAPS_API_KEY } from './../../app/app.googlemaps.apikey';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Camera } from '@ionic-native/camera';
import { EventMarker } from './../../interfaces/event-marker.interface';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {
  navParam: any;
  mapUrl: any;
  mapEventRef$: AngularFireList<EventMarker>;
  mapEvent = {} as EventMarker;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:AngularFireDatabase) {
    //this.mapEventRef$ = this.database.list<MapEvent>('map-events').valueChanges().subscribe(console.log);
    this.mapEventRef$ = this.database.list('map-events');
  }

  ionViewDidLoad() {
    this.navParam = this.navParams.get('param1');

    this.mapEvent.lat = this.navParam.getPosition().lat();
    this.mapEvent.lng = this.navParam.getPosition().lng();

    this.mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
      this.mapEvent.lat + ', ' + this.mapEvent.lng + '&zoom=17&size=400x200&maptype=roadmap%20&markers=color:green%7Clabel:E%7C' +
      this.mapEvent.lat + ', ' + this.mapEvent.lng + '&key=' + GOOGLE_MAPS_API_KEY;
  }

  addEvent(mapEvent: EventMarker) {
    console.log(mapEvent);
    this.mapEventRef$.push(mapEvent);
    this.mapEvent = {} as EventMarker;
    this.navCtrl.pop();
  }

  eventDetail(marker){
    alert(marker.key);
  }
}
