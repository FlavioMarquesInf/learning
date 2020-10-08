import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
//import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular/umd';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
//import { UserService } from '../providers/user/user.service';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyCKfnlzHmLDvFWil_sO6yxSerDatqL3LDI",
  authDomain: "chat-firebase-41a40.firebaseapp.com",
  databaseURL: "https://chat-firebase-41a40.firebaseio.com",
  projectId: "chat-firebase-41a40",
  storageBucket: "chat-firebase-41a40.appspot.com",
  messagingSenderId: "849238147782"
}

@NgModule({
  declarations: [MyApp, HomePage, SignupPage],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    BrowserModule,
    //HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, SignupPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    //UserService
  ]
})
export class AppModule {}
