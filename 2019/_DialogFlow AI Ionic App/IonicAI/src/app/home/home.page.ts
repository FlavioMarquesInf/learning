import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  messages: any[] = [];

  constructor() {
    this.messages.push({
      text: 'oi, como posso te ajudar?',
      sender: 'api'
    });

    this.messages.push({
      text: 'oi',
      sender: 'me'
    });
  }

}
