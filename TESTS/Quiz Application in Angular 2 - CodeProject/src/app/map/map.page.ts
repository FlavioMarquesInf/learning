import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { MouseEvent, } from '@agm/core';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  lat = -21.673487146792187;
  lng = -49.74722883785091;
  zoom = 15;

  constructor(private admobFree: AdMobFree, private platform: Platform) {}

  ngOnInit() {
    if (this.platform.is('cordova')) {

      const bannerConfig: AdMobFreeBannerConfig = {
        // add your config here
        // for the sake of this example we will just use the test config
        id: 'ca-app-pub-1159939390618465/7007868469',
        isTesting: true,
        autoShow: true
      };
      this.admobFree.banner.config(bannerConfig);

      this.admobFree.banner.prepare()
        .then(() => {
          // banner Ad is ready
          // if we set autoShow to false, then we will need to call the show method here
        })
        .catch(e => console.log(e));
    }


  }

  mapClicked($event: MouseEvent) {
    const event = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
    };

    console.log('mapClicked', event);
  }

}
