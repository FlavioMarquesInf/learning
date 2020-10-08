import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Injectable()
export class NetworkConnectionProvider {
  //Network Status
  hasNetworkConnection = false
  hasWifiConnection = false

  // Observables
  disconnectSubscription$: any;
  connectSubscription$: any;

  // Text messages
  network_disconnect_message: string;
  network_connect_message: string;
  wifi_connect_message: string;
  wifi_disconnect_message: string;

  constructor(
    private network: Network,
    private toastCtrl: ToastController,
    public translateService: TranslateService,
  ) {
    // TimeOut needed here, if removed the translateService can't get the values;
    setTimeout(() => {
      this.translateService.get([
        'NETWORK_DISCONNECTED_MESSAGE',
        'NETWORK_CONNECTED_MESSAGE',
        'WIFI_CONNECTED_MESSAGE',
        'WIFI_DISCONNECTED_MESSAGE',
      ]).subscribe((values) => {
        //console.warn(values)
        this.network_disconnect_message = values['NETWORK_DISCONNECTED_MESSAGE'];
        this.network_connect_message = values['NETWORK_CONNECTED_MESSAGE'];
        this.wifi_connect_message = values['WIFI_CONNECTED_MESSAGE'];
        this.wifi_disconnect_message = values['WIFI_DISCONNECTED_MESSAGE'];

        this.watchConnectSubscription();
        this.watchDisconnectSubscription();
      });
    }, 100);

    console.log('-NetworkConnectionProvider init.');
  }

  _presentConnectionStatusToast(mess: string) {
    let toast = this.toastCtrl.create({
      message: mess,
      duration: 6000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Fechar' //TODO: variavel de tradução
    });
    toast.present();
  }

  watchDisconnectSubscription() {
    try {
      this.disconnectSubscription$ = this.network.onDisconnect()
        .subscribe(() => {
          this.hasNetworkConnection = false;
          this.hasWifiConnection = false;
          this._presentConnectionStatusToast(this.network_disconnect_message);
        });
    } catch (error) {
      new Error(error.message);
    }
  }

  watchConnectSubscription() {
    try {
      this.connectSubscription$ = this.network.onConnect() // watch network for a connection
        .subscribe(() => {
          this.hasNetworkConnection = true;
          this._presentConnectionStatusToast(this.network_connect_message);
          // We just got a connection but we need to wait briefly
          // before we determine the connection type. Might need to wait.
          // prior to doing any api requests as well.
          setTimeout(() => {
            // this block don't work in Chrome, is mobile-only, the return of "this.network.type" is "null" in Chrome.
            //console.warn(this.network); //shows "null" in Chrome;
            const isWifi = this.network.type !== null && this.network.type === 'wifi'
            if (isWifi) {
              this.hasWifiConnection = true;
              this._presentConnectionStatusToast(this.wifi_connect_message);
            }else{
              this.hasWifiConnection = false;
              this._presentConnectionStatusToast(this.wifi_disconnect_message);
            }
          }, 3000);
        });
    } catch (error) {
      new Error(error.message);
    }
  }

  unwatchSubscriptions() {
    try {
      const canUnsubscribe = this.disconnectSubscription$ !== undefined && this.connectSubscription$ !== undefined
      if (canUnsubscribe) {
        this.disconnectSubscription$.unsubscribe();
        this.connectSubscription$.unsubscribe();
      }
    } catch (error) {
      new Error(error.message);
    }
  }
}
