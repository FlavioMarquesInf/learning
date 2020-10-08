import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule} from 'angularfire2';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

const config = {
  apiKey: "AIzaSyDBJhQcXoiCnCUvpYeTDtHqJSV9sVjMN3w",
  authDomain: "address-book-a27b4.firebaseapp.com",
  databaseURL: "https://address-book-a27b4.firebaseio.com",
  projectId: "address-book-a27b4",
  storageBucket: "address-book-a27b4.appspot.com",
  messagingSenderId: "525963784917"
};


const appRoutes: Routes  = [
  {path: '', component: HomeComponent },
  {path: 'listings', component: ListingsComponent },
  {path: 'listings/:id', component: ListingsComponent },
  {path: 'add-listings', component: AddListingComponent },
  {path: 'edit-listing', component: EditListingComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(config),
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }