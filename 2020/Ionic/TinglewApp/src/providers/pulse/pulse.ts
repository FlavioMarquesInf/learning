import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Shake } from '@ionic-native/shake';
import { Toast } from '@ionic-native/toast';
import { BackgroundMode } from '@ionic-native/background-mode';

//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class Pulse {
  timesShooke: number = 0; //numero de vezes que o celular foi sacudido.
  bgEnabled: boolean = false; //define se o modo background está ligado ou não para o pulse.
  watch: any;

  constructor(
    public plt: Platform,
    public shake: Shake,
    public toast: Toast,
    public storage: Storage,
    public bgMode: BackgroundMode) {
  }

  communicate(date){
    console.log('communicate',date);
  }

  startShakeDetection() {
    if (this.plt.is('cordova')) {



      let date = new Date();

      setTimeout(function () {
        setInterval(this.communicate, 60000);
        this.communicate(date);
      }, (60 - date.getSeconds()) * 1000);



      this.storage.get('shakes').then( (val) => {
        this.timesShooke = val;
      });

      this.watch = this.shake.startWatch(20).subscribe( () => {
        this.timesShooke++;

        this.storage.set('shakes', this.timesShooke);

        this.toast.show(`Shook for x` + this.timesShooke + ` time(s).`, '2000', 'center');
      });

    }
  }

  stopShakeDetection() {
    this.watch.unsubscribe();
  }

  startBackgroundMode() {
    let opt = {
      title: 'Tinglew - Pulse is On',
      text: 'Shake detection is enabled, just dance!',
      color: '00468C'
    }
    this.bgMode.setDefaults( opt );
    this.bgMode.disableWebViewOptimizations();
    this.bgMode.overrideBackButton();
    this.bgMode.enable();
    this.bgEnabled = true;
    //alert('isEnabled: '+this.bgMode.isEnabled());
  }

  stopBackgroundMode(){
    this.bgMode.disable();
    this.bgEnabled = false;
  }
}
