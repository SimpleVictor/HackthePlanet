import { Component, OnInit } from '@angular/core';
import {HomePage} from "../home/home";

@Component({
    templateUrl: 'build/pages/tabs/tabs.component.html'
})
export class TabsComponent implements OnInit {
  private tab1:any;



  constructor() {

    this.tab1 = HomePage;


    }


    ngOnInit() { }




}
