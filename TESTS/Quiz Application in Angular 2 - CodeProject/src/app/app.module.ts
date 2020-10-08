import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { GooglePlus } from '@ionic-native/google-plus/ngx'; // We'll install this in the next section
import { GoogleLoginComponent } from './google-login/google-login.component';
import { IonicStorageModule } from '@ionic/storage';

import { AgmCoreModule } from '@agm/core';

import { AdMobFree } from '@ionic-native/admob-free/ngx';

const firebaseConfig = {
  apiKey: 'AIzaSyAVu8gDioK4A9Jm4pTEgk6g3KMjIiElUmE',
  authDomain: 'no-ponto-1549755661094.firebaseapp.com',
  databaseURL: 'https://no-ponto-1549755661094.firebaseio.com',
  projectId: 'no-ponto-1549755661094',
  storageBucket: 'no-ponto-1549755661094.appspot.com',
  messagingSenderId: '678454766547'
};

@NgModule({
  declarations: [AppComponent, GoogleLoginComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), // <-- firebase here
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBoK_NbT5QDLDeoMe7iFF3Wn_Hb_5jsbrM'
    })

  ],
  providers: [
    GooglePlus,
    Geolocation,
    StatusBar,
    SplashScreen,
    AdMobFree,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
