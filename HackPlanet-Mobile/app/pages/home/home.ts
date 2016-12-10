import { Component } from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {TabsComponent} from "../tabs/tabs.component";
import { StatusBar } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
  constructor(public navCtrl: NavController, menu: MenuController) {
    // menu.enable(true);
  }

  TakeOutStatus(){
    StatusBar.hide();
  }

}
