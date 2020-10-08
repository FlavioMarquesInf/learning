import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsMapPage } from './events-map';
//import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    EventsMapPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsMapPage),
    //AgmCoreModule.forRoot({ apiKey: 'AIzaSyDPrDy8prLZbghTjM9PT-j9C7bokl6HN_4' })
  ],
})
export class EventsMapPageModule {}
