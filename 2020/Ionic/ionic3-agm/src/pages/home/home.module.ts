import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
//Angular maps framework
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDPrDy8prLZbghTjM9PT-j9C7bokl6HN_4'})
  ],
})
export class HomePageModule {}
