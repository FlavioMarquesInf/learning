import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google: any;
import * as MarkerClusterer from "@google/markerclusterer";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  markers: any[]
  mapObject: any
  userCurrentLocation: any = { lat: -21.65560503668722, lng: -49.72808667275564}

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.loadMap();

    }, 5000);
  }

  loadMap() {
    const minLat = -22.266262383125767
    const maxLat = -21.6556050366872
    const minLng = -50.413740235699606
    const maxLng = -49.7449094876970

    let newMarkers = [];

    let markersAmount = 0
    while (markersAmount <= 200) {
      const newlat = (Math.random() % (maxLat + 1 - minLat)) + minLat
      const newlng = (Math.random() % (maxLng + 1 - minLng)) + minLng
      newMarkers.push({ lat: newlat, lng: newlng })
      markersAmount++
    }

    this.markers = newMarkers
    console.warn(newMarkers)



    const latLng = new google.maps.LatLng(this.userCurrentLocation.lat, this.userCurrentLocation.lng);
    let mapOptions = {
      center: latLng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: false,
      scaleControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
    }
    const mapObject = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    google.maps.event.addListenerOnce(mapObject, 'idle', () => {
      this.mapElement.nativeElement.classList.add('show-map');
    });


    setTimeout(() => {

      newMarkers.map((location) => {
        console.warn(location)
        const latLng = new google.maps.LatLng(location.lat, location.lng);
        let marker = new google.maps.Marker({
          map: this.mapObject,
          position: latLng,
        });
      })

      console.warn(MarkerClusterer)

      var markerCluster = MarkerClusterer(this.mapObject);

    }, 3000);
  }
}

