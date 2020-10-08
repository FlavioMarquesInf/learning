import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  id: any;
  listing: any;
  imageUrl: any;

  constructor(
      private firebaseService: AngularFireDatabase,
      private router:Router,
      private route:ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
