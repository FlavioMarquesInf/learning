import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.scss']
})
export class EditListingComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any[]>;
  id: any;
  listing: any;
  imageUrl: any;
  constructor(private db: AngularFireDatabase) {
    this.items = this.db.list('Harry');
    this.item = this.db.object('/Harry');
  }
  deleteObject(itemKey) {
    this.db.object('/Harry/' + itemKey).remove();
  }
  editObject(itemKey) {
    this.db.object('/Harry/' + itemKey);
  }

  ngOnInit() {
  }

}
