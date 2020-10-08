import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MouseEvent } from '@agm/core';
import { EventsProvider } from '../../providers/events/events';
//import { LocationProvider } from '../../providers/location/location';
import { Geolocation } from '@ionic-native/geolocation';
import { ActionSheetController } from 'ionic-angular';
//import { EventDetailPage } from '../event-detail/event-detail';

@IonicPage()
@Component({
  selector: 'page-events-map',
  templateUrl: 'events-map.html',
})
export class EventsMapPage {
  @ViewChild('agmMap') mapElement: ElementRef;

  // google maps zoom level
  zoom: number = 14;

  // initial center position for the map
  lat: number = 0;
  lng: number = 0;

  options: any;

  mapIsReady:boolean;

  markers: Marker[];
  /*
  markers: Marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true,
      eventTitle: 'Blablabla'
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: '',
      draggable: false,
      eventTitle: 'Ooopaaa'
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: '',
      draggable: true,
      eventTitle: 'Uiiiaaa'
    }
  ]
  */

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public eventsProvider: EventsProvider,
    //public locationProvider: LocationProvider,
    private geolocation: Geolocation
  ) {

    this.geolocation.getCurrentPosition().then((position) => {
      this.lat = position.coords.latitude
      this.lng = position.coords.longitude
      this.recenterMap(this.lat, this.lng);
    }).catch((error) => {
      console.error(error);
      alert('Erro de Geolocalização via GPS');
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude
          this.lng = position.coords.longitude
          this.recenterMap(this.lat, this.lng);
        }, (error) => {
          console.error(error);
          alert('Erro de Geolocalização via HTML5');
        });
      }
    });

    this.markers = eventsProvider.getEvents();
    console.log(this.markers);

    var styleArray = [
      {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          },
          {
            "saturation": "-100"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "saturation": 36
          },
          {
            "color": "#000000"
          },
          {
            "lightness": 40
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "off"
          },
          {
            "color": "#000000"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 17
          },
          {
            "weight": 1.2
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#4d6059"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4d6059"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#4d6059"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "lightness": 21
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#4d6059"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4d6059"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#7f8d89"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#7f8d89"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#7f8d89"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#7f8d89"
          },
          {
            "lightness": 29
          },
          {
            "weight": 0.2
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 18
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#7f8d89"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#7f8d89"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#7f8d89"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#7f8d89"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 19
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#2b3638"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2b3638"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#24282b"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#24282b"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ];

    this.options = {
      control: {},
      styles: styleArray
    };
  }

  ionViewDidLoad() {
    //this.recenterMap(-21.69339021887765, -49.71951091271967);
    this.mapIsReady = true;
  }

  mapPanToMyLocation(){
    this.recenterMap(this.lat, this.lng);
  }

  recenterMap(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  clickedMarker(label: string, index: number, marker: any) {
    console.log(`clicked the marker: ${label || index}, ${marker.key}`);
    this.presentActionSheet(label, index, marker.key);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
      eventTitle: 'info...'
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  removeMarker(){
    this.markers.pop();
  }

  presentActionSheet(label: string, index: number, key: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: `Place ${label || index}, ${key}`,
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            this.markers.splice(index, 1);
            console.log('Destructive clicked');
          }
        }, {
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  eventTitle: string;
}

