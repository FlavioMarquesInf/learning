import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.items = this.db.list('Harry');
    this.item = this.db.object('/Harry');
  }
  deleteObject(itemKey) {
    this.db.object('/Harry/' + itemKey).remove();
  }
  editObject(itemKey) {
    console.log(itemKey);
  }
  ngOnInit() {
  }
}
