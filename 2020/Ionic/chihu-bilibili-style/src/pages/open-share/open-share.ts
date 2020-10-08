import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { ThemeProvider } from '../../providers/theme/theme';
/**
 * Generated class for the OpenSharePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-open-share',
  templateUrl: 'open-share.html',
})
export class OpenSharePage {

  _theme;
  _id;
  _data:any = {};
  _popover = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public themeProvider: ThemeProvider,
    public popoverCtrl: PopoverController
  ) {
    this._theme = this.themeProvider._theme;
    this._id = this.navParams.get( '_id' );
    this.getdata();
  }

  //获取数据
  getdata() {
    
        let url = "https://www.devonhello.com/chihuv3/open_share";
    
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
        this.http.post(url, "id=" + this._id, {
          headers: headers
        })
          .subscribe((res) => {
            this._data = res.json()[0];
            this._popover = this.popoverCtrl.create('PopoverSharePage',{
              _data: this._data
            });
            console.log( this._data );
          });
      }

      presentPopover(ev) {
        if(this._popover){
          this._popover.present({ ev: ev });
        }
        
      }

}
