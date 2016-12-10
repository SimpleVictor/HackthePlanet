import { Component } from '@angular/core';
import {ionicBootstrap, Platform, MenuController, NavController} from 'ionic-angular';
import { StatusBar } from 'ionic-native';


import {TabsComponent} from "./pages/tabs/tabs.component";
import {HomePage} from "./pages/home/home";
import {SettingsPage} from "./pages/settings/settings";
import {DoctorTalk} from "./pages/doctortalk/doctortalk";
import {FbService} from "./providers/FbService";
import {AddPills} from "./pages/addpills/addpills";
import {LoginPage} from "./pages/login/login";


@Component({
  providers: [NavController, FbService],
  template: `


<ion-menu [content]="content" (ionOpen)="menuOpened()" (ionClose)="menuClosed()">
  <!--<ion-header>-->
    <!--<ion-toolbar>-->
      <!--<ion-title>Pages</ion-title>-->
    <!--</ion-toolbar>-->
  <!--</ion-header>-->
  <ion-content>
  
    <div class="top-menu" style="background: url('img/profile/profile_background.png');background-size: cover; height: 32%;position:relative;margin-top:-35px;">
      
      <style>
      
      .profile-container{
        height: 100px;
        width: 100px;
        display: inline-flex;
        position: absolute;
        left: 32%;
        top: 24%;
      }
      
      .menu-item{
        font-size: 21px;
      }
      
      .profile-title{
          margin-top: 0 !important;
          font-size: 1.9rem;
          color: #FFF;
          font-weight: 900;
          position: absolute;
          bottom: 0;
          text-align: center;
          left: 17%;
      }
      
    </style>
      <div class="profile-container">
        <img src="img/profile/default_profile_pic.jpg" style="border-radius: 100%;border: 5px solid #FFF;">   
      </div>      
       <h3 class="profile-title">Welcome Back, John</h3>
      
    </div>
    
    <ion-list >
      <ion-item class="menu-item" ion-button tappable (click)="GoToUpcoming()">
        <ion-icon name="timer" item-left></ion-icon>
          Upcoming
          <ion-badge style="font-size: 16px" item-right color="secondary">3</ion-badge>
      </ion-item>
      <ion-item class="menu-item">
        <ion-icon name="alarm" item-left></ion-icon>
          Schedule
      </ion-item>
      <ion-item class="menu-item">
        <ion-icon name="medkit" item-left></ion-icon>
          Medicine
      </ion-item>
      <ion-item class="menu-item"> 
        <ion-icon name="pie" item-left></ion-icon>
          Pie Chart
      </ion-item>
      <ion-item class="menu-item" ion-button tappable (click)="GoToAddPills()">
        <ion-icon name="add" item-left></ion-icon>
          Add Pill
      </ion-item>
      <ion-item class="menu-item">
        <ion-icon name="people" item-left></ion-icon>
          Friends / Doctors
      </ion-item>
      <ion-item class="menu-item" ion-button tappable (click)="GoToSettings()">
        <ion-icon name="settings" item-left></ion-icon>
          Settings
      </ion-item>
      <ion-item class="menu-item" ion-button tappable (click)="GoToDoctorTalk()">
        <ion-icon name="settings" item-left></ion-icon>
          Send message
      </ion-item>
    </ion-list>
    
    
  </ion-content>
</ion-menu>


<ion-nav #content [root]="rootPage"></ion-nav>


`,
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(public platform: Platform, public menu: MenuController, public navCtrl: NavController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      menu.enable(true);
      // StatusBar.styleDefault();
      StatusBar.overlaysWebView(false);
      // StatusBar.styleBlackTranslucent()
      StatusBar.styleDefault();
    });
  }

  menuOpened(){
    StatusBar.hide();
  }

  menuClosed(){
    StatusBar.show();
  }

  GoToUpcoming(){
    this.rootPage = HomePage;
    this.menu.close();
  }

  GoToSettings(){
    this.rootPage = SettingsPage;
    this.menu.close();
  }

  GoToDoctorTalk(){
    this.rootPage = DoctorTalk;
    this.menu.close();
  }

  GoToAddPills(){
    this.rootPage = AddPills;
    this.menu.close();
  }


}

  ionicBootstrap(MyApp,[],{
  iconMode: "md"
});
