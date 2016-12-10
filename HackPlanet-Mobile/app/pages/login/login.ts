import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import {FbService} from "../../providers/FbService";

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage{

  constructor(private navCtrl: NavController, public fbService: FbService) {

  }


  TakeOutStatus(){
    StatusBar.hide();
  }

  submitLogin(username, password){

    let obj = {
        username: username.value,
        password: password.value
    };


    this.fbService.SendUserPass(obj).subscribe(
      (data) => {
        console.log("Success sending the data");
        console.log(data);
      }, (err) => {
        console.log("Either the pass is wrong or thee was an error");
        console.log(err);
      }
    )

  }



}
