import { START_LOADING, StartLoading } from './shared/ui.actions';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import * as fromRoot from './app.reducer';
import * as UI from './shared/ui.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  registerUser(credentials) {
    this.store.dispatch(new UI.StartLoading());
    setTimeout(() => {
      this.store.dispatch(new UI.StopLoading());
    }, 1000);
  }

  login(credentials) {
    const user = {
      ...credentials,
      name: 'Fulano'
    };

    return of(user);
  }
}
