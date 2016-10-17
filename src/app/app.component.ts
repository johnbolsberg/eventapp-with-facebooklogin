import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { AngularFire } from 'angularfire2';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage;

  constructor(platform: Platform, af: AngularFire) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.rootPage = HomePage;
        console.log("I'm here! HomePage");
      } else {
        this.rootPage = LoginPage;
        console.log("I'm here! LoginPage");
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
