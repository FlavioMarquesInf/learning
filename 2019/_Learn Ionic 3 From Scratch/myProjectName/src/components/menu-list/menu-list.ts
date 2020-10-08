import { Component } from '@angular/core';

/**
 * Generated class for the MenuListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu-list',
  templateUrl: 'menu-list.html'
})
export class MenuListComponent {

  text: string;

  constructor() {
    console.log('Hello MenuListComponent Component');
    this.text = 'Hello menu list';
  }

}
