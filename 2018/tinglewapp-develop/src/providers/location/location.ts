import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, Platform } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';

import { Location } from './location.interface';

@Injectable()
export class LocationProvider {

  public userCurrentPosition: Location = {lat:0, lng:0}
  public lastChecking: string


  // Message Texts
  private titleText: string
  private messageText: string
  private buttonTextCancel: string
  private buttonTextActivate: string

  constructor(
    private diagnostic: Diagnostic,
    private geolocation: Geolocation,
    private alertCtrl: AlertController,
    public platform: Platform,
    translate: TranslateService,
  ) {

    //Get translated texts
    setTimeout(() => {
      translate.get(["LOCATION_ALERT_CONFIRM_TITLE",
        "LOCATION_ALERT_CONFIRM_MESSAGE",
        "LOCATION_ALERT_CONFIRM_BUTTON_CANCEL",
        "LOCATION_ALERT_CONFIRM_BUTTON_ACTIVATE",
      ]).subscribe(
        values => {
          this.titleText = values.LOCATION_ALERT_CONFIRM_TITLE
          this.messageText = values.LOCATION_ALERT_CONFIRM_MESSAGE
          this.buttonTextCancel = values.LOCATION_ALERT_CONFIRM_BUTTON_CANCEL
          this.buttonTextActivate = values.LOCATION_ALERT_CONFIRM_BUTTON_ACTIVATE
        }
      )
    }, 1000);

    const intervalSeconds = 10
    this.watchPosition(intervalSeconds);

    setTimeout(() => {
      this.verifyGPSAvaliability().then(canShowConfirm => {
        const isCordova = this.platform.is('cordova')
        if (isCordova && canShowConfirm) {
          this.presentLocationSettingConfirm()
        }
      })
    }, 5000);


    //TESTS

    // this.verifyGPSAvaliability().then( gps =>
    //   console.warn('verifyGPSAvaliability(): ', gps)
    // ).catch(error => console.error(error))

    // this.getGPSPosition().then( loc => {
    //   console.warn('getGPSPosition(): ', loc)
    // }).catch(error => console.error(error))

    // this.getHTML5Position().then( loc =>
    //   console.warn('getHTML5Position(): ', loc)
    // ).catch(error => console.error(error))

    // this.getPosition().then( position =>
    //   console.warn('getPosition(): ', position)
    // ).catch(error => console.error(error))

  }

  public async getPosition() {
    return this.getGeoPosition()
    .then(geoPosition => this.convertPositionFormat(geoPosition))
    .then(convertedPosition => this.setPosition(convertedPosition))
    .catch(error=> new Error(error.message))
  }

  private async presentLocationSettingConfirm() {

    await this.alertCtrl.create({
      title: this.titleText,
      message: this.messageText,
      buttons: [
        {
          text: this.buttonTextCancel,
          role: 'cancel'
        },
        {
          text: this.buttonTextActivate,
          handler: () => {
            this.diagnostic.switchToLocationSettings()
          }
        }
      ]
    })
    .present();
  }

  private async getGeoPosition(): Promise<any> {
    try {
      const html5Position = await this.getHTML5Position()
      const isGPSAvaliable = await this.verifyGPSAvaliability()
      const gpsPosition = await this.getGPSPosition()
      return isGPSAvaliable ? gpsPosition : html5Position
    } catch (error) {
      return new Error(error.message)
    }
  }

  private async verifyGPSAvaliability(): Promise<any> {
    //OBS: this.diagnostic.isGpsLocationEnabled() is only use by Android.
    //More info: https://ionicframework.com/docs/native/diagnostic/
    return new Promise(async(resolve, reject)=>{
      try {
        if (this.platform.is('cordova')) {
          resolve(this.diagnostic.isGpsLocationEnabled())
        } else {
          resolve(false)
        }
      } catch (error) {
        reject(new Error(error.message))
      }
    })
  }

  private async getHTML5Position(): Promise<any> {
    return new Promise((resolve, reject)=> {
      try { // Try HTML5 geolocation.
        const geopositionOptions = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
        navigator.geolocation.getCurrentPosition(
          geoposition => resolve(geoposition),
          error => new Error(error.message),
          geopositionOptions
        );
      } catch (error) {
        reject(new Error(error));
      }
    });

  }

  private async getGPSPosition(): Promise<any> {
    try {
      return await this.geolocation.getCurrentPosition()
    } catch (error) {
      return new Error(error.message);
    }
  }

  private async convertPositionFormat(position: any): Promise<any> {
    try {
      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    } catch (error) {
      return new Error(error.message)
    }
  }

  private async setPosition(formatedPosition: any): Promise<any> {
    try {
      this.userCurrentPosition = formatedPosition
      this.lastChecking = new Date().toLocaleString();
      return this.userCurrentPosition
    } catch (error) {
      return new Error(error.message)
    }
  }

  //TODO: tratar caso for mozilla firefox, essa função faz com que toda hora que aconteça uma mudança no observable
  // o navegador pede autorização para detectar a localização, e mesmo aceitando, ele pede novamente em um curto periodo de tempo,
  // é inviável usar o firefox para depurar por causa desse comportamento.
  watchPosition(interval): void { //OBS: mobile-only
    try {
      setInterval(() => {
        this.geolocation.watchPosition()
        .subscribe((geoPosition) => {
          this.convertPositionFormat(geoPosition)
          .then(formatedPosition => this.setPosition(formatedPosition))
        })
        .unsubscribe()
      }, interval * 1000)
    } catch (error) {
      new Error(error.message)
    }
  }

}
