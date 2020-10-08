import { Injectable, OnInit } from '@angular/core';
// import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { Diagnostic } from '@ionic-native/diagnostic';
// OBS: diagnostic quando injetado no construtor causa erro.
// ele era usado no script antigo para saber se a localização (GPS) do mobile está desativada,
// para que o app possa perguntar ao usuário se ele deseja ativar esta opção,
// direcionando o usuário para a tela de configurações onde tem a opção de "ativar a localização";

@Injectable({
  providedIn: 'root'
})
export class UserLocationService implements OnInit {

  public userCurrentPosition: any;
  public lastCheckingTimestamp: string;

  constructor(
    private geolocation: Geolocation,
    // private platform: Platform,
  ) {
    this.ngOnInit();
  }

  ngOnInit() {
    setInterval(() => console.log('Location interval: ' + Date.now()), 30000);

    // console.log('platform.is(cordova)', this.platform.is('cordova'));

    // this.getUserLocation()
    //   .then(console.log);

    // this.getHtml5Geolocation().then(console.log);

  }

  public async getUserLocation() {
    try {
      const gpsPosition = await this.getGPSPosition();
      // console.log(gpsPosition);

      const html5Position = await this.getHtml5Geolocation();
      // console.log(html5Position);

      const convertedPosition = await this.convertPositionFormat(gpsPosition ? gpsPosition : html5Position);
      // console.log(convertedPosition);
      return await this.setPosition(convertedPosition);
    } catch (error) {
      return console.error(error);
    }
  }

  public async getHtml5Geolocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(location => {
          this.userCurrentPosition = location;
          // console.log(this.userCurrentPosition);
          resolve(location);
        });

      } else {
        reject('Geolocation is not supported by this browser.');
      }

    });
  }


  private async getGPSPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then(location => {
        // resp.coords.latitude
        // resp.coords.longitude
        this.userCurrentPosition = location;
        resolve(location);
      }).catch((error) => {
        console.error('Error getting location: ', error);
      });
      // reject('Geolocation is not supported by this browser.');
      resolve(false);
    });
  }

  private async convertPositionFormat(position: any): Promise<any> {
    try {
      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        lastCheck: new Date().toLocaleString()
      };
    } catch (error) {
      return console.error(error);
    }
  }

  private async setPosition(formatedPosition: any): Promise<any> {
    try {
      this.userCurrentPosition = formatedPosition;
      return this.userCurrentPosition;
    } catch (error) {
      return console.error(error);
    }
  }




}
