import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThemeProvider } from '../../providers/theme/theme';
/**
 * Generated class for the MitPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mit',
  templateUrl: 'mit.html',
})
export class MitPage {

  _theme;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public themeProvider: ThemeProvider
  ) {
    this._theme = this.themeProvider._theme;
  }

}
