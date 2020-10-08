import { DateFnsModule, DateFnsConfigurationService } from 'ngx-date-fns';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeedPage } from './feed.page';

import { AngularFirestore } from '@angular/fire/firestore';

const routes: Routes = [
  {
    path: '',
    component: FeedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DateFnsModule.forRoot()
  ],
  declarations: [FeedPage],
  providers: [
    AngularFirestore,
    DateFnsConfigurationService
  ]
})
export class FeedPageModule {}
