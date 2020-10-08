import { PeopleService } from './../shared/people.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  constructor(private peopleService: PeopleService) { }
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.peopleService.form.controls;

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.peopleService.form.valid) {
      if (this.peopleService.form.get('$key').value == null) 
        this.peopleService.insertPeople(this.peopleService.form.value);
        else
          this.peopleService.updatePeople(this.peopleService.form.value);
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.peopleService.form.reset();
    }
  }

}
