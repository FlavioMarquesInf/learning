
/* Firebase Setup */
import { environment } from './../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

/* Angular */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Spinner */
import { NgxSpinnerModule } from 'ngx-spinner';

/* Components */
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { MainNavComponent } from './main-nav/main-nav.component';

/* Service */
import { PeopleService } from './shared/people.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Material Design */
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule
} from '@angular/material';

import { LayoutModule } from '@angular/cdk/layout';




@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PeopleListComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    NgxSpinnerModule
  ],
  providers: [
    PeopleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
