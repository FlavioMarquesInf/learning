import { Component, OnInit } from '@angular/core';
import {AngularFire} from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss']
})
export class AddListingComponent implements OnInit {
  $key: any;
  name: any;
  email: any;
  mobile: any;
  address: any;

  constructor(
      private af: AngularFire,
      private router: Router
  ) { }

  ngOnInit() {
  }

  onAddSubmit() {
    const listing = {
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      address: this.address
    };
    this.af.database.list('Harry/').push(listing);
    this.router.navigateByUrl('/listings');
  }

}
