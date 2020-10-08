import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  slideOpts = {
    effect: 'fade',
    speed: 2000,
    autoHeight: true,
    watchOverflow: true,
    loop: true,
    autoplay: {
      delay: 2000,
    },
  };

  backgrounds = [
    'https://images.unsplash.com/photo-1535025287458-e3badca98021' +
    '?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aabca54bbff0b329140561274ffcd37a&auto=format&fit=crop&w=1352&q=80',

    'https://images.unsplash.com/photo-1535222919969-4548310d5955' +
    '?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b458937f68cf9c81e2122bd389e6db38&auto=format&fit=crop&w=1350&q=80'
  ];

  constructor() { }

  ngOnInit() {
  }

}
