import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../app.reducer';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private store: Store<{ui: fromApp.State}>) {}
  ngOnInit(): void {

    // this.isLoading$ = this.store.pipe(map(isloading => isloading));

    this.store.subscribe(state => {
      console.log(state);
    });
  }
}
