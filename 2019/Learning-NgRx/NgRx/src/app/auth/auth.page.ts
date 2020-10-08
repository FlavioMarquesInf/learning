import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';
import { State, Store } from '@ngrx/store';
import * as fromRoot from './../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  public isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  login() {

    const userData = {
      id: '123456',
      email: 'ametrine@wow.com',
      name: 'Fulano'
    };

    this.authService.registerUser(userData);

  }

}
