import { DateFnsModule, DateFnsConfigurationService } from 'ngx-date-fns';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommentsPage } from './comments.page';

import { AngularFirestore } from '@angular/fire/firestore';

const routes: Routes = [
  {
    path: '',
    component: CommentsPage
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
  declarations: [CommentsPage],
  providers: [AngularFirestore, DateFnsConfigurationService]
})
export class CommentsPageModule {}
