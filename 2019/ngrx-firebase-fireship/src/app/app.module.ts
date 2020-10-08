import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { simpleReducer } from './reducers/simple.reducer';

const firebaseConfig = {
  apiKey: 'AIzaSyAz8c7CWnheVB-vTZbNYTVFMD3O0DeszZ8',
  authDomain: 'learningapp-889ce.firebaseapp.com',
  databaseURL: 'https://learningapp-889ce.firebaseio.com',
  projectId: 'learningapp-889ce',
  storageBucket: '',
  messagingSenderId: '39766493496',
  appId: '1:39766493496:web:6ba977655583a37d8159cd',
  measurementId: 'G-JEDRSYCHNK'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ message: simpleReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
