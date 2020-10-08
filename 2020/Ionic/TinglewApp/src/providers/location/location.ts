import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocationProvider {
  lat:number;
  lng:number;

  constructor(private geolocation: Geolocation) {
    this.getLocation();
  }

  public getLocation(){
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude

        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      }, (error) => {
        console.error(error);
        alert('Erro de Geolocalização via HTML5');
      });
    }else{
      this.geolocation.getCurrentPosition().then((position) => {
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude

        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      }).catch((error) => {
        console.error(error);
        alert('Erro de Geolocalização via GPS');
      });

      let watch = this.geolocation.watchPosition();
      watch.subscribe((position) => {
          this.lat = position.coords.latitude,
          this.lng = position.coords.longitude
      });
    }
  }

}

