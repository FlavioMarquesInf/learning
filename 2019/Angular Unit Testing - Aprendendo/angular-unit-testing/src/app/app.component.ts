import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromStore from './store';
import { MyObject } from './models/myobject.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-unit-testing';

  objects$: any;

  contactForm: FormGroup;
  contact = {
    name: null,
    email: null,
    text: null
  };

  submitted = false;

  constructor(private store: Store<fromStore.ProductsState>) {
    this.createForm();
  }

  ngOnInit(): void {
    // this.store.select<any>('products').subscribe(state => {
    //   console.log(state);
    //   this.objects$ = this.store.select(fromStore.getAllObjects);
    // });

    // this.store.select<any>('objects').subscribe(state => {
    //   console.log(state);
    // });

    this.objects$ = this.store.select(fromStore.getAllObjects);
    this.store.dispatch(new fromStore.LoadMyObjects());

  }

  createForm() {
    this.contactForm = new FormGroup({
      name : new FormControl(this.contact.name, [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl(this.contact.email, [
        Validators.required,
        Validators.email
      ]),
      text : new FormControl(this.contact.text, [Validators.required]),
    });
  }

  onSubmit(): void {
    this.submitted = true;
  }
}
