import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialEventsListPage } from './social-events-list';

@NgModule({
  declarations: [
    SocialEventsListPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialEventsListPage),
    TranslateModule.forChild()
  ],
})
export class SocialEventsListPageModule {}
