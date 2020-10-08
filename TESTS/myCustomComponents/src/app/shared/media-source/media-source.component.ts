import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-media-source',
  templateUrl: './media-source.component.html',
  styleUrls: ['./media-source.component.scss'],
})
export class MediaSourceComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() placeholderIconName = 'images';
  @Output() change = new EventEmitter<string>();
  @ViewChild('fileInput') fileInput;


  imageBase64: string;
  fileName: string;
  fileExtension: string;

  constructor(
    private camera: Camera,
    private alertController: AlertController,
    private platform: Platform,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}

  async getMedia() {
    if (this.platform.is('cordova')) {
      this.imageBase64 = await this.presentImageSourceAlertConfirm();
      this.change.emit(this.imageBase64);
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  removeMedia() {
    this.imageBase64 = null;
    this.fileName = null;
    this.fileExtension = null;

    this.change.emit(null);
  }

  changeMedia(media) {
    this.change.emit(media);
  }

  private async cameraGetPhotolibrary() {
    try {
      const options: CameraOptions = {
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE,
        // saveToPhotoAlbum: true,
        correctOrientation: true,
        allowEdit: true,
        targetHeight: 512,
        targetWidth: 512,
      };

      const imageData = await this.camera.getPicture(options);
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      return base64Image;

    } catch (error) {
      throw new Error(error);
    }
    // this.placesService.newPlace.cover._imageBase64 = base64Image;
  }

  private async cameraGetPicture() {
    try {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum: true,
        correctOrientation: true,
        allowEdit: true,
        targetHeight: 512,
        targetWidth: 512,
      };

      const imageData = await this.camera.getPicture(options);
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      return base64Image;

    } catch (error) {
      console.error(error);
      return JSON.stringify(error);
    }

    // this.placesService.newPlace.cover._imageBase64 = base64Image;
  }

  private async presentImageSourceAlertConfirm() {
    try {
      let imageData = '';
      const alert = await this.alertController.create({
        header: 'Imagem de capa',
        buttons: [{
          text: 'Galeria',
          handler: async () => {
            imageData = await this.cameraGetPhotolibrary();
          }
        }, {
          text: 'Camera',
          handler: async () => {
            imageData = await this.cameraGetPicture();
          }
        }]
      });
      await alert.present();
      return imageData;
    } catch (error) {
      throw new Error(error);
      // return error;
    }

  }

  // Used in view, input type="file" (change)="processWebImage($event)"
  processWebImage(event) {
    try {
      const fileIsEmpty = !event || !event.target || !event.target.files || event.target.files.length === 0;
      if (fileIsEmpty) {
        return;
      }

      const reader = new FileReader();

      if (event.target.files[0]) {

        reader.readAsDataURL(event.target.files[0]);

        reader.onload = readerEvent => {

          const name = event.target.files[0].name;
          const lastDot = name.lastIndexOf('.');

          const fileName = name.substring(0, lastDot);
          const fileExtension = name.substring(lastDot + 1);

          const imageBase64Data = (readerEvent.target as any).result;

          const imageData = {
            _imageBase64: imageBase64Data,
            _fileName: fileName,
            _fileExtension: fileExtension,
          };

          this.imageBase64 = imageBase64Data;
          this.fileName = fileName;
          this.fileExtension = fileExtension;

          this.change.emit(this.imageBase64);
        };
      }

    } catch (error) {
      throw new Error(error);
    }

  }

}
