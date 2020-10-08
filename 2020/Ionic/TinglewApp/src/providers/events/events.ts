import { Injectable } from '@angular/core';

import { EventMarker } from './../../interfaces/event-marker.interface';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class EventsProvider {
  mapEvents = [];
  mapEventRefArray$: AngularFireList<EventMarker[]>;
  mapEventRef$: AngularFireList<EventMarker>;
  mapEvent = {} as EventMarker;

  constructor(private database: AngularFireDatabase) {
    //this.getEvents();
  }

  getEvents(){
    this.mapEvents = [];
    this.database.list('map-events').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(items => {
      items.map(mapEvent => {
        this.mapEvents.push(mapEvent);
      })
    });
    return this.mapEvents;
  }

  addEvent(mapEvent: EventMarker) {
    this.mapEventRef$.push(mapEvent);
    this.mapEvent = {} as EventMarker;
  }
}
