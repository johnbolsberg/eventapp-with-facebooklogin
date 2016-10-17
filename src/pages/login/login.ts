import {NavController,LoadingController,AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { EmailValidator } from '../../app/validators/email-validator';
import { Facebook } from 'ionic-native';
import firebase from 'firebase';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  userProfile: any = null;
  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;


  constructor(public nav: NavController, public authData: AuthData,
              public formBuilder: FormBuilder,public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }
  loginUser(){

    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        this.nav.setRoot(HomePage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  goToSignup(){
    this.nav.push(SignupPage);
  }

  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }

  loginWithFacebook(){
    Facebook.login(['email']).then((response) => {
      alert('Logged in');
      alert(JSON.stringify(response.authResponse));
    },(error)=>{
      alert(error);
    })
  }
  getDetailsFacebook(){
    Facebook.getLoginStatus().then((response)=>{
      if(response.status=='connected'){
        Facebook.api('/'+response.authResponse.userID+ '?fields=id,name,gender',[]).then((response)=> {
          alert(JSON.stringify(response));
        },(error)=>{
          alert(error);
        })
      }
      else{
        alert('Not Logged in');
      }
    })

  }
  logOutFacebook(){
    Facebook.logout().then((response)=>
    {
      alert(JSON.stringify(response));
    },(error)=>{
      alert(error);
 })
  }


}
