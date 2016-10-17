import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Facebook } from 'ionic-native';


// Import pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import {ProfilePage} from "../pages/profile/profile";

import {EventDetailPage} from "../pages/event-detail/event-detail";
import {EventCreatePage} from "../pages/event-create/event-create";
import {EventListPage} from "../pages/event-list/event-list";

// Import providers
import { AuthData } from '../providers/auth-data';
import {ProfileData} from "../providers/profile-data";
import {EventData} from "../providers/event-data";


// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCMBo3xkJ97LIC6WLd9HtIQ2sFJFgpQBEw",
  authDomain: "eventapp-8dde4.firebaseapp.com",
  databaseURL: "https://eventapp-8dde4.firebaseio.com",
  storageBucket: "eventapp-8dde4.appspot.com",
  messagingSenderId: "96131341191"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
      ProfilePage,
      EventDetailPage,
      EventCreatePage,
      EventListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ProfilePage,
    EventDetailPage,
    EventCreatePage,
    EventListPage

  ],
  providers: [
    AuthData,ProfileData,EventData,Facebook
  ]
})
export class AppModule {}