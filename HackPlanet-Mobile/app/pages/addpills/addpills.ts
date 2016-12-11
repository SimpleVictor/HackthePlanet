import { Component, NgZone } from '@angular/core';
import {StatusBar} from "ionic-native";
import { AlertController } from 'ionic-angular';
import {FbService} from "../../providers/FbService";

declare var firebase;

@Component({
  templateUrl: 'build/pages/addpills/addpills.html'
})
export class AddPills{

  zone;

  constructor(private serverService: FbService, public alertCtrl: AlertController) { }


  ionViewDidEnter(){


    this.zone = new NgZone({enableLongStackTrace: false});
    let valueChanged = firebase.database().ref("/Listener");


    valueChanged.on("value", (snapshot) => {

      let obj = snapshot.val();
      console.log(obj);

      // this.CheckAtStartUp(obj);

      this.zone.run(() => {
        Object.keys(obj).forEach((key) => {
          if(key === "AddMorePills" && key !== 'PlayMessage5' && key !== 'PlayMessage6'){
            if(obj[key].active === 1){
              this[key](key, obj);
            };
          };
        });
      });

    });

  }

  refreshSkill(skill){
    this.serverService.Refresh_ActiveSkill(skill).subscribe(
      (data) => {
        console.log("Sucessfylly changed the data");
      }, (err) => {
        console.log(err);
      }
    );
  }

  AddMorePills(skill, respond){
    let myResponse = respond[skill].respond;
    console.log(myResponse);
    this.showAlert(myResponse);
    this.refreshSkill(skill)
  }

  TakeOutStatus(){
    StatusBar.hide();
  }

  showAlert(val) {
    let alert = this.alertCtrl.create({
      title: 'Fill up',
      subTitle: `Your patient , John, needs a refill on ${val}`,
      buttons: [
        {
          text: 'Deny',
          handler: data => {
            console.log('Cancel clicked');
            this.serverService.deniedRequest().subscribe(
              (myVal) => {
                console.log("Success deny");
              }, (err) => {
                console.log("There was an error");
              }
            )
          }
        },
        {
          text: 'Accept',
          handler: data => {
            console.log('Saved clicked');
            this.serverService.acceptRequest().subscribe(
              (myVal) => {
                console.log("Success deny");
              }, (err) => {
                console.log("There was an error");
              }
            )
          }
        }
      ]
    });
    alert.present();
  }




}
