import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { IclassPage } from '../pages/iclass/iclass';
import { DynamicPage } from '../pages/dynamic/dynamic';
import { MessagePage } from '../pages/message/message';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from '@ionic-native/app-version';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { ThemeProvider } from '../providers/theme/theme';
import { UserProvider } from '../providers/user/user';
import { JpushProvider } from '../providers/jpush/jpush';
import { RongCloudProvider } from '../providers/rong-cloud/rong-cloud';

@NgModule({
  declarations: [
    MyApp,
    IclassPage,
    MessagePage,
    HomePage,
    DynamicPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IclassPage,
    MessagePage,
    HomePage,
    DynamicPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ThemeProvider,
    UserProvider,
    JpushProvider,
    RongCloudProvider
  ]
})
export class AppModule {}
