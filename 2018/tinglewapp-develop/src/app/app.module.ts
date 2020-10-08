import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// Native
import { BackgroundMode } from '@ionic-native/background-mode';
import { Toast } from '@ionic-native/toast';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Shake } from '@ionic-native/shake';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Network } from '@ionic-native/network';
import { HeaderColor } from '@ionic-native/header-color';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

// Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Firebase
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';

import {
  Settings,
  LocationProvider,
  UserProvider,
  PulseProvider,
  SocialEventsProvider,
  NetworkConnectionProvider,
  LogProvider,
  AuthProvider,
} from '../providers';



export var GeoFire: any;

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   */
  return new Settings(storage, {
    option1: true, // Background mode
    option2: 5, // Search radius in kilometers
    //option3: '3',
    //option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    //AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Camera,
    SplashScreen,
    StatusBar,
    Shake,
    BackgroundMode,
    Toast,
    Geolocation,
    Diagnostic,
    Network,
    HeaderColor,
    UniqueDeviceID, //TODO: usar esse provider para identificar o device na hora da criação da conta/login

    LocationProvider,
    UserProvider,
    SocialEventsProvider,
    PulseProvider,
    NetworkConnectionProvider,
    LogProvider,
    AuthProvider,


    { provide: Settings, useFactory: provideSettings, deps: [Storage] },

    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
