import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { EventData } from '../../providers/event-data';
import { Camera } from 'ionic-native';



/*
  Generated class for the EventDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {
  currentEvent: any;
  guestName: string = '';
  guestPicture:any;

  constructor(public nav: NavController, public navParams: NavParams,public eventData: EventData) {
    this.eventData.getEventDetail(this.navParams.get('eventId')).on('value', (snapshot) => {
      this.currentEvent = snapshot.val();
    });
  }
  addGuest(guestName) {
    this.eventData.addGuest(guestName, this.currentEvent.id, this.currentEvent.price, this.guestPicture).then(() => {
      this.guestName = '';
      this.guestPicture = null;
    });
  }
  takePicture(){
    Camera.getPicture({
      quality : 95,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.guestPicture = imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
}
