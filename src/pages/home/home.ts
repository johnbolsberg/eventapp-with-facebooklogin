import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventCreatePage } from '../event-create/event-create';
import { EventListPage } from '../event-list/event-list';

//import pages
//import {LoginPage} from '../login/login';
import { ProfilePage } from '../profile/profile';

//import provider
import { AuthData } from '../../providers/auth-data';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public authData:AuthData) {
    
  }

  goToProfile(){
    this.navCtrl.push(ProfilePage);
  }
  goToCreate(){
    this.navCtrl.push(EventCreatePage);
  }

  goToList(){
    this.navCtrl.push(EventListPage);
  }

}
