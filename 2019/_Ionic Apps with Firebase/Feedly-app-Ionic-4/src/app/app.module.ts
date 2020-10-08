import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { Camera } from '@ionic-native/camera/ngx';
import { DateFnsModule, DateFnsConfigurationService } from 'ngx-date-fns';

import * as enLocale from 'date-fns/locale/en';
const englishConfig = new DateFnsConfigurationService();
englishConfig.setLocale(enLocale);

export const firebaseConfig = {
  apiKey: 'AIzaSyC6Iu8OUvwZZ7BfLZddN8fBO-Xq-XE7hrE',
  authDomain: 'feedly-5d2b1.firebaseapp.com',
  databaseURL: 'https://feedly-5d2b1.firebaseio.com',
  projectId: 'feedly-5d2b1',
  storageBucket: 'feedly-5d2b1.appspot.com',
  messagingSenderId: '466661839895'
};

import { CommentsPageModule } from './pages/comments/comments.module';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,

    CommentsPageModule,
    DateFnsModule.forRoot(),

    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: DateFnsConfigurationService, useValue: englishConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
