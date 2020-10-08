import { Injectable } from '@angular/core';

import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { BackgroundMode } from '@ionic-native/background-mode';
import { Shake } from '@ionic-native/shake';
import { Toast } from '@ionic-native/toast';


@Injectable()
export class PulseProvider {
  timesShooke: number = 0; //numero de vezes que o celular foi sacudido.
  bgEnabled: boolean = false; //define se o modo background está ligado ou não para o pulse.
  shakeWatcher: any;

  constructor(
    public plt: Platform,
    public shake: Shake,
    public toast: Toast,
    public storage: Storage,
    public bgMode: BackgroundMode) {
  }

  startShakeDetection() {
    //TODO: criar esquema de ciclos com intervalos de 1 em 1 minuto com setInterval()
    //cada vez que o ciclo terminar o valor total deve ser enviado para o servidor e o contador deve reiniciar.
    //isso fará com que o usuário do app informe a movimentação do celular com atraso de um minuto apenas.
    if (this.plt.is('cordova')) {
      this.storage.get('shakes').then( (val) => {
        this.timesShooke = val;
      });

      this.shakeWatcher = this.shake.startWatch(20).subscribe( () => {
        this.timesShooke++;
        this.storage.set('shakes', this.timesShooke);
        //TODO: substituir o toast por um event emmiter.
        this.toast.show(this.timesShooke + 'x time(s) shook', '2000', 'center');
      });
    }
  }

  stopShakeDetection() {
    this.shakeWatcher.unsubscribe();
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
