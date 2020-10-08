import { TranslateService } from '@ngx-translate/core';

import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController, Slides } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Location } from './../../providers/location/location.interface';

import { LocationProvider, SocialEventsProvider } from '../../providers';

declare var google: any;

import { GOOGLE_MAPS_API_KEY } from "../../app/app.googlemaps.apikey";
import * as googleMapsClient from '@google/maps' //TODO: testar recursos. Fonte: https://github.com/googlemaps/google-maps-services-js


import * as MarkerClusterer from 'node-js-marker-clusterer';

import 'rxjs/add/operator/toPromise';
import { from } from 'rxjs/observable/from';


//OBS: recurso de clusterer: https://npmjs.com/package/node-js-marker-clusterer
//OBS: documentação do clusterer: http://htmlpreview.github.io/?https://github.com/googlemaps/v3-utility-library/blob/master/markerclusterer/docs/reference.html
//Obs: detalhes sobre o uso das apis: https://console.developers.google.com/google/maps-apis/api-list?project=tinglew-app&pli=1&authuser=1
//Obs: https://developers.facebook.com/apps/467553243673007/settings/basic/

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  userCurrentLocation: any = { lat: 0, lng: 0}

  mapObject: any = {} // Holds the map dom object
  mapLoading: any
  googleMapIsReady: boolean = false
  private mapStyle: any

  @ViewChild('mapCanvas') mapElement: ElementRef
  @ViewChild(Slides) slides: Slides

  userLocationCircleMarker: any
  newEventMarker: any
  infoWindow: any

  markers = [] // Holds the marker dom objects
  mapEvents = [] // Holds the events array

  searchRadiusKm: number

  showEventActionButtons: boolean = false
  showRefreshWarning: boolean = false // Used to show the refresh/reload icon after map was created
  showFabNewEvent: boolean = true

  userLocationInfoWindowText: string

  constructor(
    private http: HttpClient,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public socialEventsProvider: SocialEventsProvider,
    public locationProvider: LocationProvider,
    private toastCtrl: ToastController,
    translate: TranslateService,
  ) {

    setTimeout(() => {
      translate.get([
        "MAP_USER_LOCATION_INFOWINDOW",
      ]).subscribe(
        values => {
          this.userLocationInfoWindowText = values.MAP_USER_LOCATION_INFOWINDOW
        }
      )
    }, 1);


    // Tests
    googleMapsClient.createClient({
      key: GOOGLE_MAPS_API_KEY,
      Promise: Promise
    }); console.warn('TODO: Test googleMapsClient', googleMapsClient)


    this.initMap().then( async res => {
      console.warn('All promises executed', res) //output: ok
    }).then(
      ()=>{
        //Test: marker clusterer test
        this.__randomMarkersGenerate(10, this.userCurrentLocation)
      }
    )


    //TODO: implementar o comportamento para exibir o toast sobre mover o marker no mapa somente uma vez, ou com intervalo grande entre cada exibição.

    // Change zoom level to 12, programmatically.
    // google.maps.event.addListenerOnce(map, 'bounds_changed', function() {
    //   map.setZoom(12)
    // })


  }


  __randomMarkersGenerate(markersAmount = 1, position) {
    const radius = 0.5

    const minLat = position.lat - radius
    const maxLat = position.lat + radius
    const minLng = position.lng - radius
    const maxLng = position.lng + radius

    console.warn('Lat', minLat, maxLat)
    console.warn('Lng', minLng, maxLng)

    let locations = [];

    for (let i = 0; i < markersAmount; i++) {
      const newlat = (Math.random() % (maxLat + 1 - minLat)) + minLat
      const newlng = (Math.random() % (maxLng + 1 - minLng)) + minLng
      locations.push({ lat: newlat, lng: newlng, eventTitle: 'Evento @Tinglew' })
    }

    let markers = []

    locations.map((location) => {
      //console.warn(location)
      let marker = new google.maps.Marker({
        map: this.mapObject,
        position: new google.maps.LatLng(location.lat, location.lng),
      });
      markers.push(marker)
    })

    let clustererOptions = {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      gridSize: 50,
      maxZoom: 15
    }
    let markerCluster = new MarkerClusterer(this.mapObject, markers, clustererOptions)


    //Salvar locais gerados no banco
    // locations.map(location => {
    //   this.socialEventsProvider.createNewSocialEvent(location).then(()=>console.warn('Item created'))
    // })
  }


  //OK
  private _createMapObject(mapStyle, userCurrentLocation) {
    return new Promise((resolve, reject)=>{
      try {
        const latLng = new google.maps.LatLng(userCurrentLocation.lat, userCurrentLocation.lng);
        let mapOptions = {
          center: latLng,
          zoom: 8, //18 valor padrão
          styles: mapStyle,
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

        this.googleMapIsReady = true;

        resolve(mapObject)
      } catch (error) {
        reject(new Error(error.message))
      }
    })

  }


  slideChanged() {
    let currentIndex = this.slides.getActiveIndex()
    console.log('Current index is', currentIndex)
  }


  goToSlide() {//TODO: usar para mover para o slide correspondente ao clicar no marker do mapa;
    this.slides.slideTo(2, 500)
  }


  mapCenterAt(marker) {
    this.mapObject.panTo({ lat: marker.lat, lng: marker.lng })
  }

  //OK
  private _getMapStyleJSON() {
    return this.http.get("./assets/map-styles/map-style-5.json")
    // return this.http.get("./assets/map-styles/map-style-4.json")
    // return this.http.get("./assets/map-styles/map-style-3.json")
    // return this.http.get("./assets/map-styles/map-style-2.json")
    // return this.http.get("./assets/map-styles/map-style-1.json")
  }

  initMap() {

    return Promise.all([
      this._getMapStyleJSON().toPromise(),
      this.locationProvider.getPosition(),
    ])
    .then(mapStyleAndUserLocation => {
      this.mapStyle = mapStyleAndUserLocation[0]
      this.userCurrentLocation = mapStyleAndUserLocation[1]
      this.mapLoading = this.presentLoadingDefault()
      return this._createMapObject(this.mapStyle, this.userCurrentLocation)
    })
    .then(async mapObj => {
      this.mapObject = mapObj
      this.userLocationCircleMarker = this._createUserLocationCircleMarker()
      this._createMarkersOnMap() //TODO: mudar retorno para promise

      this.showRefreshWarning = true


      this.mapLoading.dismiss()
      return this.showRefreshWarning
    })


      //TODO: pedir ao usuário que ele ligue o localização(GPS) e mostrar botão de refresh.
      //pode ser mostrado um "toast" sobre a localização(GPS) estar desligada ou mostrar na barra de título um icone de aviso, quando clicado mostrar o toast.



      // MARKER CLUSTERER

      //TODO: teste de clustering: falhou, continuar outro dia...
      // setTimeout(() => {
      //   console.warn(this.markers);
      //   this.markers
      //   var markerCluster = new MarkerClusterer(
      //     this.map,
      //     this.markers,
      //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }
      //   );
      // }, 20000);

  }

  ionViewDidLoad() {
    //TODO: trocar string de content por variável de tradução
    let loading = this.loadingCtrl.create({
      content: 'Aguarde o carregamento por favor, está quase pronto...'
    });
    loading.present();
    this.initMap();
    loading.dismiss();
  }

  mapPanToLocation() {
    // Move to device location on map
    if (this.showEventActionButtons) {
      this.mapObject.panTo(this.newEventMarker.position);
    } else {
      this.mapObject.panTo(this.userCurrentLocation);
    }
  }

  private async _createUserLocationCircleMarker() {
    //Add a circle marker at device location on map
    const circleMarker = new google.maps.Marker({
      position: this.userCurrentLocation,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 4,
        strokeColor: '#393'
      },
      map: this.mapObject,
    });
    this.addInfoWindow(circleMarker, this.userLocationInfoWindowText);
    return circleMarker
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
    this.setMapOnAll(this.mapObject);
  }


  addNewMarker() {

    let icon = {
      url: '../assets/img/general-green-marker2.fw.png', // url
      scaledSize: new google.maps.Size(34, 46), // scaled size
      //origin: new google.maps.Point(0, 0), // origin
      //anchor: new google.maps.Point(0, 0) // anchor
    };


    let marker = new google.maps.Marker({
      map: this.mapObject,
      position: this.mapObject.getCenter(),
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: icon
      //icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', //TODO: criar um marker para esta função, o red-dot do link é feio.
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

    //TODO: trocar string por variável de tradução.
    let toast = this.toastCtrl.create({
      message: 'Você pode mover o marcador vermelho pelo mapa',
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Fechar'
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


  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content,
      maxWidth: 300
    });

    this.infoWindow = infoWindow;

    google.maps.event.addListener(marker, 'click', () => {
      this.infoWindow.setContent(content);
      // Open the infowindow on the marker.
      this.infoWindow.open(this.mapObject, marker);

      console.log('Item clicked: ', marker);
      //TODO: aqui será implementada a regra de navegação dos markers,
      //quando um marker for clicado será atribuído um valor para o slide ativo que levara até o slide do marker clicado.
    });
  }

  setMapOnAll(map) {
    // Sets the map on all markers in the array.
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }


  presentModal() {
    this.navCtrl.push('NewSocialEventPage', {
      markerData: this.newEventMarker
    });
  }

  showToastForLocation() {
    //TODO: trocar string por variável de tradução.
    let toast = this.toastCtrl.create({
      message: 'Sua localização está desativada, ligue para aumentar a precisão!',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Quase pronto...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
    return loading;
  }


  loadNearbySocialEvents() {
    this.socialEventsProvider.getNearbyEvents();
    this.mapEvents = null;
    this.mapEvents = this.socialEventsProvider.nearbySocialEvents$;
    console.log('Array de eventos:', this.mapEvents);
  }

  private _createMarker(mapEvent: any) {

    let marker = new google.maps.Marker({
      map: this.mapObject,
      position: { lat: mapEvent.lat, lng: mapEvent.lng },
      animation: google.maps.Animation.DROP,
      //icon: 'http://mt.google.com/vt/icon?psize=27&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=50&text=•&scale=1',
      //icon: icon,
      key: mapEvent.key,
      eventTitle: mapEvent.eventTitle,
      eventDescription: mapEvent.eventDescription,
      eventType: mapEvent.eventType,
      eventStartDate: mapEvent.eventStartDate,
      eventEndDate: mapEvent.eventEndDate,
      eventStartTime: mapEvent.eventStartTime,
      eventEndTime: mapEvent.eventEndTime,
      eventTicketType: mapEvent.eventTicketType,
      eventTicketPrice: mapEvent.eventTicketPrice,
      eventAccess: mapEvent.eventAccess,
      eventRefundPolicy: mapEvent.eventRefundPolicy,
      eventAddress: mapEvent.eventAddress,
      distance: mapEvent.distance,
    });

    let infoContent = '';

    if (typeof marker.eventTitle !== 'undefined') {
      infoContent += '<h4>' + marker.eventTitle + '</h4>';
      infoContent += 'Distância: ' + marker.distance + ' Km';
      infoContent += '<span style="float:right">outra info...<span>'
    }

    this.addInfoWindow(marker, infoContent);

    this.markers.push(marker);
  }

  private _createMarkersOnMap() {
    return new Promise((resolve, reject)=>{
      this.mapEvents = [];

      //this.socialEventsProvider.getNearbyEvents();

      this.mapEvents = this.socialEventsProvider.nearbySocialEvents$;
      this.searchRadiusKm = this.socialEventsProvider.minSearchRadius;//TODO: modificar regra que utiliza o raio de busca, tornar automático e remover do settings,
      //essa feature deve ser assim: o raio de busca inicial começa de 5 km, e vai aumentando de 5 em 5 até preencher o array de eventos

      this.mapEvents.forEach(element => {
        console.log('-ForEach...', element)
        this._createMarker(element);
      });


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
        map: this.mapObject,
        //position: latLng,
        animation: google.maps.Animation.DROP,
        //icon: 'http://mt.google.com/vt/icon?psize=27&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=43&ay=50&text=•&scale=1',
        //icon: icon,
        //key: mapEvent.key,
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

      /*
      if (typeof marker.startDate !== 'undefined') {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        let date = new Date(marker.startDate);
        infoContent += '<p><b>Data do início: </b>' + date.toLocaleDateString("pt-BR", options) + '</p>';
      }
      */


      this.addInfoWindow(marker, infoContent);

      //console.log(marker);
      this.markers.push(marker);

    })
  }
}
