import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewSocialEventPage } from './new-social-event';

@NgModule({
  declarations: [
    NewSocialEventPage,
  ],
  imports: [
    IonicPageModule.forChild(NewSocialEventPage),
    TranslateModule
  ],
})
export class NewSocialEventPageModule {}
