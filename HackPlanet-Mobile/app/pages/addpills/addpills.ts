import { Component, OnInit } from '@angular/core';
import {StatusBar} from "ionic-native";

@Component({
  templateUrl: 'build/pages/addpills/addpills.html'
})
export class AddPills{
    constructor() { }



  TakeOutStatus(){
    StatusBar.hide();
  }

}
