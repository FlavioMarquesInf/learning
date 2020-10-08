import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { AngularFireDatabase, AngularFireList } from '../../../node_modules/angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private firebase: AngularFireDatabase) { }
  peopleList: AngularFireList<any>;

  form = new FormGroup ({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    location: new FormControl('')
  });


  getPeople() {
    this.peopleList = this.firebase.list('peoples');
    return this.peopleList.snapshotChanges();
  }


  insertPeople(people) {
    this.peopleList.push({
      fullName: people.fullName,
      email: people.email,
      mobile: people.mobile,
      location: people.location
    });
  }

  populateForm(people) {
    this.form.setValue(people);
  }

  updatePeople(people) {
    this.peopleList.update(people.$key,
      {
        fullName: people.fullName,
        email: people.email,
        mobile: people.mobile,
        location: people.location
      });
  }

  deletePeople($key: string) {
    this.peopleList.remove($key);
  }

}
