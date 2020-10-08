import { Component, OnInit } from '@angular/core';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'browser-event-experiments',
  templateUrl: './browser-event-experiments.component.html',
  styleUrls: ['./browser-event-experiments.component.scss']
})
export class BrowserEventExperimentsComponent implements OnInit {

  hoverSelection: HTMLElement;

  constructor() { }

  ngOnInit() {
    this.hoverSelection = document.getElementById('hover');

    this.hoverSelection.addEventListener('mousemove', onMouseMove);

  }

  unsubscribe() {
    console.log('Called unsubscribe');
    this.hoverSelection.removeEventListener('mousemove', onMouseMove)
  }

}

function onMouseMove(ev: MouseEvent) {
  console.log(ev);
}
