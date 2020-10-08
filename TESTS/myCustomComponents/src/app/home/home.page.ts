import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  resultImage;
  constructor() {}

  processData($event) {
    this.resultImage = $event;
    console.log(this.resultImage);
  }

  ngOnInit() {}

}
