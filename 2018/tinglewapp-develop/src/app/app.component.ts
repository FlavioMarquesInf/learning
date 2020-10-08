import { NetworkConnectionProvider } from './../providers/network-connection/network-connection';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HeaderColor } from '@ionic-native/header-color';

import { BackgroundMode } from '@ionic-native/background-mode';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirstRunPage, MainPage, WelcomePage } from '../pages';

import {
  Settings,
  UserProvider,
  LocationProvider,
  //PulseProvider,
  SocialEventsProvider,
  LogProvider,
} from '../providers';

@Component({
  templateUrl: './app.menu.html' //TODO: remodelar o menu;
})
export class MyApp {
  rootPage = '';

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Test', component: 'TestPage', icon: 'options' },
    { title: 'Tutorial', component: 'TutorialPage', icon: 'albums'},
    { title: 'Welcome', component: 'WelcomePage', icon: 'happy' },
    { title: 'Tabs', component: 'TabsPage', icon: 'home' },
    { title: 'Login', component: 'LoginPage', icon: 'log-in' },
    { title: 'Signup', component: 'SignupPage', icon: 'person-add' },
    { title: 'Menu', component: 'MenuPage', icon: 'menu' },
    { title: 'Settings', component: 'SettingsPage', icon: 'cog' },
    { title: 'Map', component: 'MapPage', icon: 'map' },
    { title: 'Events', component: 'SocialEventsListPage', icon: 'paper' },
    { title: 'NewSocialEvent', component: 'NewSocialEventPage', icon: 'add' },
    { title: 'EventsList', component: 'SocialEventsListPage', icon: 'paper' },
  ]

  backgroundModeEnabled;
  hasNetworkConnection = false;
  hasWifiConnection = false;

  constructor(
    public platform: Platform,
    public settings: Settings,
    private translate: TranslateService,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private toastCtrl: ToastController,
    private headerColor: HeaderColor,

    private userProvider: UserProvider,
    //private pulseProvider: PulseProvider,
    //private socialEventsProvider: SocialEventsProvider,
    public locationProvider: LocationProvider,
    public backgroundMode: BackgroundMode,
    public networkConnectionProvider: NetworkConnectionProvider
  ) {

    // This block of code do the app initial navigation flow.
    this.storage.get('hasSeenTutorial').then((hasSeenTutorial) => {
      if (hasSeenTutorial) {
        this.storage.get('userData').then((userData) => {
          //console.log('userData', userData.json());
          if (userData !== null) {
            this.rootPage = MainPage;
          } else {
            this.rootPage = WelcomePage;
          }
        });
      } else {
        this.rootPage = FirstRunPage;
        this.storage.set('hasSeenTutorial', true);
      }
    });



    /*
    * Main Features load
    */
    platform.ready().then(() => {

      //TODO: this.checkNetworkConnection() ...
      setInterval(() => {
        //unwatch
        //networkConnectionProvider.watchConnectSubscription();

      }, 10 * 1000);



      // Get user's location:
      // locationProvider.getHTML5Position().then((location) => {
      //   console.log('Initial user location data: ', location);
      // });


      // Try mobile-only stuff
      if (this.platform.is('cordova')) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.headerColor.tint('#becb29');

        // BackgroundMode:
        this.startBackgroundMode();

        // Fetch initial data of this.locationProvider.userCurrentPosition
        this.locationProvider.getPosition()
        .then(res => console.log('new Location: ', res))
        .catch((err) => console.log(err));
      }

      //TODO: criar regra que carrega modulos de detecção de movimento (sacudida/shake) de acordo com "default/user settings";
      // getSetting? => shakeDetection
    });
    this.initTranslate();
  }


  startBackgroundMode() {
    let options = {
      title: 'Tinglew - Pulse is On',
      text: 'Shake detection is enabled, just dance!',
      color: '00468C'
    }
    this.backgroundMode.setDefaults(options);
    this.backgroundMode.disableWebViewOptimizations();
    this.backgroundMode.overrideBackButton();
    this.backgroundMode.enable();
    this.backgroundModeEnabled = true;
  }

  stopBackgroundMode() {
    this.backgroundMode.disable();
    this.backgroundModeEnabled = false;
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      const browserCultureLang = this.translate.getBrowserCultureLang();
      if (browserLang === 'zh') {
        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else if (browserLang === 'pt') {
        this.translate.use(browserCultureLang.toLowerCase());
      }
    } else {
      this.translate.use('pt-br'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.userProvider.logout();
    console.log('Loged out');
    this.nav.setRoot('WelcomePage');
  }
}
