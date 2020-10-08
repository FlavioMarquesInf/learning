import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPageSource } from './map';

@NgModule({
  declarations: [
    MapPageSource,
  ],
  imports: [
    IonicPageModule.forChild(MapPageSource),
  ],
})
export class MapPageModule {}
