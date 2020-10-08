import { LoadingController, ModalController, NavController, ToastController } from 'ionic-angular';

//import { Observable } from 'rxjs/Observable';
import { Component, ViewChild, ElementRef } from '@angular/core';

import { Platform } from 'ionic-angular';

import { PulseProvider } from './../../providers/pulse/pulse';
import { Geolocation } from '@ionic-native/geolocation';

import { SocialEvent } from './../../models/social-event.interface';
import { NewSocialEventPage } from './../new-social-event/new-social-event';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

declare var google: any;


@Component({
  selector: 'page-map-source',
  templateUrl: 'map.html'
})
export class MapPageSource {
  map: any; //Contain the google maps
  infoWindow: any;
  currentLocation: any; //Current geolocation
  myLocationCircleMarker: any; //Marker that show me on map
  newEventMarker: any; //Marker of a new event

  mapEvents = [];
  markers = [];

  showEventActionButtons = false;
  showFabNewEvent = true;
  mapIsReady = false;

  mapEventRef$: AngularFireList<SocialEvent[]>;
  @ViewChild('mapCanvas') mapElement: ElementRef;

  constructor(
    public platform: Platform,
    public pulseProvider: PulseProvider,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private database: AngularFireDatabase
  ) {
    //pulseProvider.startShakeDetection();
    //pulseProvider.startBackgroundMode();
  }

  ionViewDidLoad() {
    this.createMap();
    //setInterval(this.myPositionMarker(), 1000);
    //setInterval(this.createMarkersOnMap(), 1000);
  }

  createMap() {
    let loading = this.loadingCtrl.create({
      //spinner: 'bubbles',
      content: 'Aguarde o carregamento por favor, está quase pronto...'
    });

    loading.present();

    let mapStyle = [
      {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
          {
            "hue": "#00ffbc"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -70
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          },
          {
            "saturation": -60
          }
        ]
      }
    ]

    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 14,
        styles: mapStyle,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        scaleControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
      }
      this.currentLocation = latLng;

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.myPositionMarker();

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        this.mapElement.nativeElement.classList.add('show-map');
      });

      //this.getPlaces();
      this.createMarkersOnMap();

      this.mapIsReady = true;
      loading.dismiss();

    }).catch((err) => {
      console.error(err);
    });


    /*
    this.confData.getMap().subscribe((mapData: any) => {

      mapData.forEach((markerData: any) => {
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        let marker = new google.maps.Marker({
          position: markerData,
          map: this.map,
          title: markerData.name,
          icon: 'http://mt.google.com/vt/icon?psize=27&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=50&text=•&scale=1'
        });

        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
        });
      });
    });
    */
  }

  mapPanToMyLocation() {
    //Move to device location on map
    if (this.showEventActionButtons) {
      this.map.panTo(this.newEventMarker.position);
    } else {
      this.map.panTo(this.currentLocation);
    }
  }

  myPositionMarker() {
    //Add a circle marker at device location on map
    this.myLocationCircleMarker = new google.maps.Marker({
      position: this.currentLocation,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 3,
        strokeColor: '#393'
      },
      map: this.map,
      title: "Você está aqui!"
    });

    this.addInfoWindow(this.myLocationCircleMarker, this.myLocationCircleMarker.title);
  }

  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      position: this.map.getCenter(),
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    });

    // Animate marker on drag
    google.maps.event.addListener(marker, "dragstart", function () {
      marker.setAnimation(3); // raise
    });
    google.maps.event.addListener(marker, "dragend", function () {
      marker.setAnimation(4); // fall
    });

    this.newEventMarker = marker;
    this.showEventActionButtons = true;
    this.showFabNewEvent = false;

    //TODO: criar o toast aqui...
    let toast = this.toastCtrl.create({
      message: 'Você pode mover o marcador vermelho pelo mapa',
      duration: 3000,
      position: 'top'
    });
    toast.present();

    /*
    //TODO: Animar markers quando estiver com mais de X de score
    marker.addListener('click', toggleBounce);
    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
    */

  }

  cancelNewMarker() {
    this.newEventMarker.setMap(null);
    this.showEventActionButtons = false;
    this.showFabNewEvent = true;
  }

  saveNewMarker() {
    //TODO: show the new event modal... then:
    this.showEventActionButtons = true;
    this.showFabNewEvent = false;
    this.setMapOnAll(this.map);
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content,
      maxWidth: 300
    });

    this.infoWindow = infoWindow;
    google.maps.event.addListener(marker, 'click', () => {
      let url = 'google.com';
      let html = content + "<a href='" + url + "' target='_blank'>Read More</a></p>";
      // set the content (saved in html variable using function closure)
      this.infoWindow.setContent(html);
      // open the infowindow on the marker.
      this.infoWindow.open(this.map, marker);
    });
  }

  setMapOnAll(map) {
    // Sets the map on all markers in the array.
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  getPlaces() {

    //===================
    var input = /** @type {!HTMLInputElement} */(
      document.getElementById('searchbar'));


    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', this.map);

    var infowindow = new google.maps.InfoWindow();

    autocomplete.addListener('place_changed', function () {
      infowindow.close();
      //this.newEventMarker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        //this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17);  // Why 17? Because it looks good.
      }

      /*
      this.newEventMarker.setIcon(({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      }));*/

      //this.newEventMarker.setPosition(place.geometry.location);
      //this.newEventMarker.setVisible(true);

      console.log(place.geometry.location);
      this.map.setCenter(place.geometry.location);

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
      infowindow.open(this.map, this.newEventMarker);
    });
    //=================
  }

  presentModal() {
    this.navCtrl.push(NewSocialEventPage, {
      param1: this.newEventMarker
    });
  }

  createMarkersOnMap() {
    this.mapEvents = [];

    this.database.list('map-events').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(items => {
      items.map(mapEvent => {
        this.mapEvents.push(mapEvent);
        //console.log(mapEvent);

        /*
        //TODO: comentado somente para pararem os erros, vou precisar fazer isso funcionar assim que esta tela estiver carregando o mapa;

        let icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

        if (typeof mapEvent.eventAccess !== 'undefined' && mapEvent.eventAccess === 'Público') {
          icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        } else if (typeof mapEvent.eventAccess !== 'undefined' && mapEvent.eventAccess === 'Privado') {
          icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }
        */


        /*
        switch (mapEvent.eventAccess) {
          case 'Público':
            icon = "green";
            break;
          case 'Privado':
            icon = "blue";
            break;

          default:
            icon = "red";
            break;
        }
        icon = "http://maps.google.com/mapfiles/ms/icons/" + icon + ".png";
        */

        //let latLng = new google.maps.LatLng(mapEvent.lat, mapEvent.lng);

        let marker = new google.maps.Marker({
          map: this.map,
          //position: latLng,
          animation: google.maps.Animation.DROP,
          //icon: 'http://mt.google.com/vt/icon?psize=27&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=50&text=•&scale=1',
          //icon: icon,
          key: mapEvent.key,
          //title: mapEvent.eventTitle,
          //description: mapEvent.eventDescription,
          //type: mapEvent.eventType,
          //startDate: mapEvent.eventStartDate,
          //endDate: mapEvent.eventEndDate,
          //startTime: mapEvent.eventStartTime,
          //endTime: mapEvent.eventEndTime,
          //ticketType: mapEvent.eventTicketType,
          //ticketPrice: mapEvent.eventTicketPrice,
          //access: mapEvent.eventAccess,
          //refoundPolicity: mapEvent.eventRefundPolicy,
          //address: mapEvent.eventAddress,
        });

        let infoContent = '';

        if (typeof marker.title !== 'undefined') {
          infoContent += '<h4>' + marker.title + '</h4>';
        }

        if (typeof marker.description !== 'undefined') {
          infoContent += '<p>' + marker.description + '</p>';
        }

        if (typeof marker.type !== 'undefined') {
          infoContent += '<p>*' + marker.type + '</p>';
        }

        if (typeof marker.ticketType !== 'undefined') {
          infoContent += '<p><b>Entrada: </b>' + marker.ticketType + '</p>';
        }

        if (typeof marker.ticketPrice !== 'undefined') {
          infoContent += '<p><b>Valor da entrada: </b>R$ ' + marker.ticketPrice + '</p>';
        }

        if (typeof marker.access !== 'undefined') {
          infoContent += '<p><b>Acesso: </b>' + marker.access + '</p>';
        }

        if (typeof marker.startDate !== 'undefined') {
          let options = { /*weekday: 'long',*/ year: 'numeric', month: 'long', day: 'numeric'/*, hour: 'numeric', minute: 'numeric'*/ };
          let date = new Date(marker.startDate);
          infoContent += '<p><b>Data do início: </b>' + date.toLocaleDateString("pt-BR", options) + '</p>';
        }

        if (typeof marker.startTime !== 'undefined') {
          infoContent += '<p><b>Hora do início: </b>' + marker.startTime + '</p>';
        }

        if (typeof marker.endDate !== 'undefined') {
          let options = { year: 'numeric', month: 'long', day: 'numeric' };
          let date = new Date(marker.endDate);
          //console.log(date.toLocaleDateString("pt-BR"));
          //console.log(date.toLocaleDateString("pt-BR", options));
          infoContent += '<p><b>Data do término: </b>' + date.toLocaleDateString("pt-BR", options) + '</p>';
        }

        if (typeof marker.endTime !== 'undefined') {
          infoContent += '<p><b>Hora do término: </b>' + marker.endTime + '</p>';
        }

        if (typeof marker.refoundPolicity !== 'undefined') {
          infoContent += '<p><b>Política de reembolso: </b>' + marker.refoundPolicity + '</p>';
        }
        if (typeof marker.address !== 'undefined') {
          infoContent += '<p><b>Endereço: </b>' + marker.address + '</p>';
        }
        if (typeof marker.key !== 'undefined') {
          infoContent += '<p><b>' + marker.key + '</b></p>';
        }

        this.addInfoWindow(marker, infoContent);

        //console.log(marker);
        this.markers.push(marker);

      });

      /*return*/ //items.map(item => item.key);
    });

    /*
    this.mapEvents.forEach(mapEvent => {

      let marker = new google.maps.Marker({
        map: this.map,
        position: {lat: mapEvent.lat, lng: mapEvent.lng},
        animation: google.maps.Animation.DROP,
        icon: 'http://mt.google.com/vt/icon?psize=27&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=50&text=•&scale=1',
        key: mapEvent.key,
        title: mapEvent.eventTitle,
        description: mapEvent.eventDescription
      });

      console.log(marker);
      this.markers.push(marker);
    });
    */

  }

}
