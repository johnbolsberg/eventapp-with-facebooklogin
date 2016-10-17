import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProfileData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileData {
  public userProfile: any;
  public currentUser: any;


  constructor() {
    this.currentUser = firebase.auth().currentUser; // We'll use this to create a database reference to the userProfile node.
    this.userProfile = firebase.database().ref('/userProfile'); // We'll use this to create an auth reference to the current user.

  }

  /**
   * This one should be really easy to follow, we are calling a function getUserProfile() that takes no parameters.
   * This function returns a DATABASE reference to the userProfile/uid of the current user
   * and we'll use it to get the user profile info in our page.
   */
  getUserProfile(): any {
    return this.userProfile.child(this.currentUser.uid);
  }

  /**
   * This one takes 2 string parameters, firstName, lastName, it just saves those 2 to the userProfile/uid node
   * for the current user as the firstName, lastName properties.
   */
  updateName(firstName: string, lastName: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  /**
   * Pretty much the same as before, just that instead of saving the name it's saving the date of birth
   */
  updateDOB(birthDate: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      birthDate: birthDate,
    });
  }


  /**
   * This is were things get trickier, this one is taking the user's email and first it's calling the
   * this.currentUser auth reference to call it's updateEmail() function, it's very important that you
   * understand that this is changing your email in the AUTH portion of firebase, the one stored in the
   * userProfile/uid node hasn't changed.
   * After it successfully changes your email in the AUTH portion of firebase it updates your email in the
   * real time database in the userProfile/uid node.
   */
  updateEmail(newEmail: string): any {
    this.currentUser.updateEmail(newEmail).then(() => {
      this.userProfile.child(this.currentUser.uid).update({
        email: newEmail
      });
    }, (error) => {
      console.log(error);
    });
  }


  /**
   * Just like before this is changing the user's password, but remember, this has nothing to do with the database
   * this is the AUTH portion of Firebase.
   */
  updatePassword(newPassword: string): any {
    this.currentUser.updatePassword(newPassword).then(() => {
      console.log("Password Changed");
    }, (error) => {
      console.log(error);
    });
  }

}

