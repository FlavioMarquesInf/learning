import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  constructor(public photoService: PhotoService) { }

  ngOnInit() {
  }

  clearAll() {
    this.photoService.clearGallery();
  }

}
