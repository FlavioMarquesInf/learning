import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, NavController, ModalController, LoadingController, ToastController, ActionSheetController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { Pulse } from './../../providers/pulse/pulse';
import { EventsProvider } from '../../providers/events/events';

import { Geolocation } from '@ionic-native/geolocation';

import { Marker } from './../../interfaces/event-marker.interface';

import { NewEventPage } from './../new-event/new-event';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { EventDetailPage } from '../event-detail/event-detail';

declare var google: any;

@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html',
})
export class MapViewPage {
  map: any; //Contain the google maps
  infoWindow: any; //Contain a unique info windows
  currentLocation: any; //Current geolocation
  myLocationCircleMarker: any; //Circle Marker that show me on map

  newEventMarker: any; //Marker of a new event

  mapEvents = []; //events came from database
  markers = []; //markers came from events

  mapIsReady = false; //show bottons when map is ready
  showEventActionButtons = false; //show create/cancel new marker
  showFabNewEvent = true; //show fab when new marker is not activated

  mapEventRef$: AngularFireList<Marker[]>;
  @ViewChild('mapCanvas') mapElement: ElementRef;

  constructor(
    public confData: ConferenceData,
    public platform: Platform,
    public pulse: Pulse,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private database: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController,
    public eventsProvider: EventsProvider
  ) {
    pulse.startShakeDetection();
    pulse.startBackgroundMode();
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde o carregamento por favor, está quase pronto...'
    });
    loading.present();
    this.createMap();
    loading.dismiss();

    setTimeout(this.createMarkersOnMap(), 1000);
  }

  createMap() {
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
      this.currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: this.currentLocation,
        zoom: 14,
        styles: mapStyle,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        scaleControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: true
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        this.mapElement.nativeElement.classList.add('show-map');
      });

      this.myPositionMarker();
      this.mapIsReady = true;
    }).catch((err) => {
      console.error(err);
    });
  }

  mapPanToMyLocation() {
    //Move to device location on map
    if (this.showEventActionButtons) {
      this.map.panTo(this.newEventMarker.position);
    } else {
      this.map.panTo(this.currentLocation);
    }
  }

  presentActionSheet(marker, key: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: `Place ${marker.eventTitle}, ${key}`,
      buttons: [
        {
          text: 'Informações',
          handler: () => {
            this.openModal(key);
            console.log('Informações clicked');
          }
        }, {
          text: 'Atualizar',
          handler: () => {
            console.log('Atualizar clicked');
          }
        }, {
          text: 'Apagar',
          role: 'destructive',
          handler: () => {
            //this.markers.splice(index, 1);
            console.log('Apagar clicked');
          }
        }, {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            console.log('Cancelar clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  openModal(key){
    const data = {key: key}
    const modal = this.modalCtrl.create(EventDetailPage, { data: data});
    modal.present();
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
      this.infoWindow.setContent(content);
      this.infoWindow.open(this.map, marker);
    });
  }

  addActionSheet(marker){
    google.maps.event.addListener(marker, 'click', () => {
      this.presentActionSheet(marker, marker.key);
    });
  }

  setMapOnAll(map) {
    // Sets the map on all markers in the array.
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  presentModal() {
    this.navCtrl.push(NewEventPage, {
      param1: this.newEventMarker
    });
  }







  dropMarkers() {
    this.clearMarkers(this.markers);

    for (var i = 0; i < this.markers.length; i++) {
      this.addMarkerWithTimeout(this.markers[i], i * 200);
    }
  }

  addMarkerWithTimeout(position, timeout) {
    setTimeout(function () {
      this.markers.push(new google.maps.Marker({
        position: position,
        map: this.map,
        animation: google.maps.Animation.DROP
      }));
    }, timeout);
  }


  clearMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  createMarkersOnMap() {
    this.clearMarkers(this.markers);
    this.mapEvents = [];

    this.markers = this.eventsProvider.getEvents();

    this.database.list('map-events').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(items => {
      items.map(mapEvent => {
        this.mapEvents.push(mapEvent);
        console.log('FireBase Item', mapEvent);

        let icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        if (typeof mapEvent.eventAccess !== 'undefined' && mapEvent.eventAccess === 'Público') {
          icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        } else if (typeof mapEvent.eventAccess !== 'undefined' && mapEvent.eventAccess === 'Privado') {
          icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        }

        let marker = new google.maps.Marker({
          map: this.map,
          position: new google.maps.LatLng(mapEvent.lat, mapEvent.lng),
          animation: google.maps.Animation.DROP,
          //icon: 'http://mt.google.com/vt/icon?psize=27&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=50&text=•&scale=1',
          icon: icon,
          key: mapEvent.key,
          title: mapEvent.eventTitle,
          description: mapEvent.eventDescription,
          type: mapEvent.eventType,
          startDate: mapEvent.eventStartDate,
          endDate: mapEvent.eventEndDate,
          startTime: mapEvent.eventStartTime,
          endTime: mapEvent.eventEndTime,
          ticketType: mapEvent.eventTicketType,
          ticketPrice: mapEvent.eventTicketPrice,
          access: mapEvent.eventAccess,
          refoundPolicity: mapEvent.eventRefundPolicy,
          address: mapEvent.eventAddress,
        });
        this.markers.push(marker);


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
        this.addActionSheet(marker);
      });

      /*return*/ //items.map(item => item.key);
    });

  }







}

