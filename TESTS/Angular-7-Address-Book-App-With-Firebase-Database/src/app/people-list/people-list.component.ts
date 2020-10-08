import { PeopleService } from './../shared/people.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {

  constructor(private peopleService: PeopleService) { }
  peopleArray = [];
  showDeleteMessage: boolean;
  searchText: string = '';

  ngOnInit() {
    this.peopleService.getPeople().subscribe(
      list => {
        this.peopleArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  onDelete($key) {
    if (confirm('Are you sure to delete this record?')) {
      this.peopleService.deletePeople($key);
      this.showDeleteMessage = true;
      setTimeout(() => this.showDeleteMessage = false, 3000);
    }
  }

  filterCondition(people) {
    return people.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
  }

}
