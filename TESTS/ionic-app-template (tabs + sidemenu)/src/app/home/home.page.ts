import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  image = 'http://i.stack.imgur.com/2OrtT.jpg';

  isSearchbarOpened: boolean;

  socialEvents: any;
  viewMode: string;

  // google maps zoom level
  zoom = 8;

  // initial center position for the map
  lat = 51.673858;
  lng = 7.815982;

  markers: Marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      // label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      // label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      // label: 'C',
      draggable: true
    }
  ];

  constructor(
    private http: HttpClient,
  ) {
    this.isSearchbarOpened = false;
    this.viewMode = 'feeds';
    this.getSocialEvents().then(
      res => this.socialEvents = res
    );
  }

  getSocialEvents(): Promise<any> {
    return this.http.get('./../../assets/dummy-data/socialevents-dummy-data.json').toPromise();
  }

  segmentChanged(event: any): void {
    console.log(event.detail.value);
    // console.log(event.target.value);
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  onSearch(event: any) {
    console.log(event.target.value);
  }

  showImageFullScreen(image: any) {
    console.log('showImageFullScreen', image);
  }

  like(socialEvent: any) {
    console.log('liked', socialEvent);
  }

  share(socialEvent: any) {
    console.log('share', socialEvent);
  }

  showProfile(socialEvent: any) {
    console.log('showProfile', socialEvent);
  }

  filterByTag(tag: any) {
    console.log('filterByTag', tag);
  }

  dismiss(socialEvent) {
    console.log('dismiss', socialEvent);
  }
  join(socialEvent) {
    console.log('join', socialEvent);
  }

  listParticipants(socialEvent) {
    console.log('listParticipants', socialEvent);
  }

  listComments(socialEvent) {
    console.log('listComments', socialEvent);
  }

  listViewers(socialEvent) {
    console.log('listViewers', socialEvent);
  }
}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
