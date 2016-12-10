import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/settings/settings.html'
})
export class SettingsPage implements OnInit {

  constructor(private navCtrl: NavController) {
    StatusBar.hide();
  }


  ngOnInit(){

  }

  TakeOutStatus(){
    StatusBar.hide();
  }



}
