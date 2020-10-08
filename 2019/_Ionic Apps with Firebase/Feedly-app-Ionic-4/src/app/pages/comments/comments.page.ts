import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';

// import * as enLocale from 'date-fns/locale/en';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  post: any = {};
  comments: any[] = [];

  // options = {
  //   locale: enLocale
  // };

  constructor(
    public db: AngularFirestore,
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController
  ) {
    this.post = this.navParams.get('post');

    const queryObservable = this.db.collection('comments',
      ref => ref.where('post', '==', this.post.id).orderBy('created', 'desc')
    ).get();

    queryObservable.subscribe(result => {
      this.comments = result.docs;
    });

  }

  ngOnInit() {
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
