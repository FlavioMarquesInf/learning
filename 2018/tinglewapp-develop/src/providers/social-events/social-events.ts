import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';

import * as GeoFire from 'geofire/dist/geofire.min';

import { LocationProvider } from './../../providers';
import { SocialEvent } from './../../models/social-event.interface';

@Injectable()
export class SocialEventsProvider {

  //mapEvent = {} as SocialEvent;
  socialEventsDbRef$: any; // Usado para criar evento
  geoFireRef$: any; // Usado para criar evento

  geoQuery: any;
  geoQueryObservable: Observable<any>;
  locationsFromGeoQuery: any[] = []; // Holds locations with key and distance from center

  nearbySocialEvents$: any[] = [];

  minSearchRadius = 5//TODO: refatorar esse cara aqui, remover ele e seus dependentes

  constructor(
    private locationProvider: LocationProvider,
    private afDb: AngularFireDatabase,
    public events: Events,
    private storage: Storage
  ) {
    console.log('-SocialEventsProvider init.');

    // Set firebase database path
    this.socialEventsDbRef$ = this.afDb.database.ref('social-events');
    this.geoFireRef$ = new GeoFire(this.afDb.database.ref('social-events-geofire'));


    // Tests
    setTimeout(async () => {
      const location = await this.locationProvider.getPosition()

      while (this.locationsFromGeoQuery.length === 0) {
        let nearbyLocationsKeys = await this._getNearbyKeys(location, 5)
        this.locationsFromGeoQuery.push(nearbyLocationsKeys)
      }

      //TODO: criar aqui regra de aumentar o raio de busca gradualmente de acordo com a quantia de locais já processados;
      console.warn('Continuar a partir daqui...', this.locationsFromGeoQuery)



      const geoQueryObservable = Observable.from(this.locationsFromGeoQuery);// Make Observable from array

      this.nearbySocialEvents$ = [];// Reset after the subscribe method
      geoQueryObservable.subscribe(
        (response) => {
          const eventRef = this.afDb.database.ref(`social-events/${response.key}`);
          eventRef.once("value", (snapshot) => {

            const socialEvent = snapshot.val();
            //socialEvent.distance = response.distance.toPrecision(3) || '???';// ...toPrecision(3) mask number like this: ##.###;

            this.nearbySocialEvents$.push(socialEvent);// Add event to nearbySocialEvents$ array;

          }, (error) => {
            new Error(error.message)
          });
        }
      );
    }, 1);




  }

  createNewSocialEvent(socialEvent: SocialEvent) {
    return new Promise((resolve, reject) => {
      try {
        this.storage.get('userData').then((userData) => { // get UID from userData. TODO: obter esse valor a partir do auth do firebase ao invés do storage.
          const uid = JSON.parse(userData).uid;
          if (uid !== undefined) {
            socialEvent.uid = uid;
            let result = this.socialEventsDbRef$.push({})
              .then((response) => {
                socialEvent.id = response.key;
                const socialEventRef = this.socialEventsDbRef$.child(`${response.key}`);
                socialEventRef.set(socialEvent);

                return this.geoFireRef$.set(response.key, [socialEvent.lat, socialEvent.lng]); // Store socialEvent in geofire;
              });
            resolve(result);

          }else{
            reject(new Error('SocialEvent.uid cannot be null.'));
          }
        })
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

  removeEvent(obj) {
    //TODO: ... remove from database from key
  }

  updateGeoQueryCriteria(location, radius) {
    this.geoQuery.updateCriteria({
      center: [location.lat, location.lng],
      radius: radius
    });
    console.log('geoQuery updateCriteria: ', location);
  }

  getNearbyEvents() {
    this.locationProvider.getPosition()
      .then(async (location) => {
        //console.log('Location callback result', location);
        return await this._getNearbyKeys(location, 5);

      }).then(()=>{
        const geoQueryObservable = Observable.from(this.locationsFromGeoQuery);// Make Observable from array

        this.nearbySocialEvents$ =[];// Reset after the subscribe method
        geoQueryObservable.subscribe(
          (response) => {
            //console.log('Event key: ', response.key)
            const eventRef = this.afDb.database.ref(`social-events/${response.key}`);
            eventRef.once("value", (snapshot) => {
              //console.log('Snapshot: ',snapshot.val());
              const socialEvent = snapshot.val();
              //socialEvent.distance = response.distance.toPrecision(3) || '???';// ...toPrecision(3) mask number like this: ##.###;
              this.nearbySocialEvents$.push(socialEvent);// Add event to nearbySocialEvents array;
            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });
          }
        );

      })
      .catch(error => {
        console.log(error)
      });
  }

  private _getNearbyKeys(centerPosition, searchRadius) {

    return new Promise(async (resolve, reject)=>{
      try {
        this.geoQuery = this.geoFireRef$.query({
          center: [centerPosition.lat, centerPosition.lng],
          radius: searchRadius
        });

        this.locationsFromGeoQuery = [];// reseta o array para evitar conteúdo duplicado.

        this.geoQuery.on("key_entered", (key, location, distance) => {
          //console.log(key + " entered query at " + location + " (" + distance + " km from center)");

          // Only add if not reaches the max amount allowed
          const maxResults = 1000
          if (this.locationsFromGeoQuery.length + 1 <= maxResults) {
            this.locationsFromGeoQuery.push({ key: key, distance: distance });
          }
        });

        this.geoQuery.on("key_exited", (key, location, distance) => {
          //console.log(key + " exited query to " + location + " (" + distance + " km from center)");

          //TODO: remover item do array pela chave (falta testar)
          const locationKey = this.locationsFromGeoQuery.indexOf({ key: key, distance: distance })
          this.locationsFromGeoQuery.splice(locationKey, 1);
        });

        this.geoQuery.on("key_moved", (key, location, distance) => {
          //console.log(key + " moved within query to " + location + " (" + distance + " km from center)");

          //TODO: reordenar por distancia quando "on key_moved" for acionado
        });

        this.geoQuery.on("ready", () => {
          //console.log("GeoQuery has loaded and fired all other events for initial data");
          this.geoQuery.cancel();

          //TODO: Avisar que o array de Keys está pronto através de event emmit para que possa ser utilizado nas buscas de eventos
          //console.log(this.locationsFromGeoQuery);


          // OBS: esse trecho funciona, só comentei para ver como está vindo a ordem original, comentario temporario.
          // this.nearbySocialEvents$.sort((a, b) => {
          //   if (a.distance < b.distance) return -1;
          //   if (a.distance > b.distance) return 1;
          //   return 0;
          // });

          resolve(this.locationsFromGeoQuery);
        });

      } catch (err) {
        reject(err);
      }
    });


    //TODO: retornar a lista pronta, com os items que serão utilizados para gerar os markers;

    //return this.locationsFromGeoQuery;

  }

  getLocationByKey(key: string) {
    //TODO: transformar em uma Promise para ser usada quando precisar excluir um evento.
    // retorna a localização de um registro pela chave
    this.geoFireRef$.get(key).then( (location) => {
      if (location === null) {
        console.log(key + " is not in GeoFire");
      }
      else {
        console.log(key + " is at location [" + location + "]");
      }
    });
  }
}
