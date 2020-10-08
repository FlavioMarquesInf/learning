import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-grid',
  templateUrl: './custom-grid.page.html',
  styleUrls: ['./custom-grid.page.scss'],
})
export class CustomGridPage implements OnInit {
  items: any;
  constructor() {
    this.items = [1, 2, 3, 4, 5, 6];
  }

  ngOnInit() {
  }

}
