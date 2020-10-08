import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  value = 'some-slug-value';

  constructor(
    private storage: Storage,
    private navCtrl: NavController
  ) {
    // this.storage.remove('introShown');
  }

  ngOnInit() {
    this.storage.get('introShown').then(result => {
      if (result == null) {
        this.storage.set('introShown', true);
        this.navCtrl.goRoot('/intro');
      }
    });
  }
}
