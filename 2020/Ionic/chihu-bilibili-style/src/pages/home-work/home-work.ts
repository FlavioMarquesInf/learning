import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
/**
 * Generated class for the HomeWorkPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-work',
  templateUrl: 'home-work.html',
})
export class HomeWorkPage {

  rootNavCtrl: NavController;
  _refresher = null;
  items = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http
  ) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
    this.getdata();
  }

  //获取数据
  getdata() {

    let url = "https://www.devonhello.com/chihuv3/home_work";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "len=" + this.items.length, {
      headers: headers
    })
      .subscribe((res) => {
        if (this._refresher) {
          this._refresher.complete();
        }
        console.log(res.json());
        this.items = this.items.concat(res.json());
      });
  }

  doRefresh(refresher) {
    this.items = [];
    this.getdata();

    this._refresher = refresher;
  }

  doInfinite(infiniteScroll) {

    this.getdata();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1500);
  }

  //查看菜谱详情
  open( _id ){
    this.rootNavCtrl.push( "OpenWorkPage",{
      _id: _id
    } );
  }

}
