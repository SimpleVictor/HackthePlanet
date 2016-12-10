import {Component, NgZone} from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { StatusBar, MediaPlugin, File, SpinnerDialog  } from 'ionic-native';
import {FbService} from "../../providers/FbService";

declare var firebase;
declare var TweenMax;
declare var Circ;
declare var Back;
declare var cordova: any;


@Component({
  templateUrl: 'build/pages/doctortalk/doctortalk.html'
})
export class DoctorTalk {

  HoldDown:boolean = false;
  ShowButton:boolean = false;
  zone;

  displayButton;
  displayButton2;

  button;
  button2;

  animation;

  // fs:string = cordova.file.dataDirectory;


  private _platform: Platform;
  private _fileRecord: MediaPlugin;

  private _pathFile: string;
  private _nameFile = "testmusic";

  file: File;


  constructor(private navCtrl: NavController, public platform: Platform, public fbService: FbService) {

  }

  public startRecord(): void {
    this._pathFile = this.getPathFileRecordAudio();
    this._fileRecord = new MediaPlugin(this._pathFile);
    this._fileRecord.startRecord();

  }

  public stopRecord(): void {
    this._fileRecord.stopRecord();
  }

  private startPlay(): void {
    this._fileRecord = new MediaPlugin(this._pathFile);
    this._fileRecord.play();

  }

  ionViewDidEnter(){

    this.animation = document.getElementById("myLoader");

    console.log(this.platform.is('ios'));

    this.zone = new NgZone({enableLongStackTrace: false});
    // document.getElementById("myButton").addEventListener("mousedown", () => {
    //   console.log("HOLD DOWN");
    //   this.startRecord();
    //   animation.style.visibility = '';
    //   animation.style.visibility = 'visible';
    //   this.HoldDown = true;
    // });
    // document.getElementById("myButton").addEventListener("mouseup",() => {
    //   console.log("MNOUSE UP");
    //   this.stopRecord();
    //   animation.style.visibility = '';
    //   animation.style.visibility = 'hidden';
    //   this.HoldDown = false;
    //   this.ShowButton = true;
    // });
    //
    // document.getElementById("myButton").addEventListener("mouseout",() => {
    //   console.log("mouse out");
    //   this.stopRecord();
    //   animation.style.visibility = '';
    //   animation.style.visibility = 'hidden';
    //   this.HoldDown = false;
    //   this.ShowButton = true;
    // });

  }

  sendAudioToFirebase(){
    SpinnerDialog.show();
    File.readAsDataURL(cordova.file.documentsDirectory+ this._pathFile).then((data) => {
      console.log("GOT FILE");
      console.log(data);
      var blob = this.blobFirebase(data);
      var storageRef = firebase.storage().ref(`checkerTest2.wav`).put(blob).then((snapshot) => {
        console.log("Finished uploading!");
        console.log(snapshot.downloadURL);
        this.fbService.AudioUrlToDB(snapshot.downloadURL).subscribe(
          (data) => {
            console.log("Sucess!");
            SpinnerDialog.hide();
          }, (err) => {
            console.log(err);
            console.log("Something went wrong");
            SpinnerDialog.hide();
          }
        );
      });
    });
  }

  private getPathFileRecordAudio(): string {
    let path: string = (this.platform.is('ios') ? '../Library/NoCloud/': '../Documents/');
    // return path + this._nameFile + '-' + '.wav';
    return path + this._nameFile + '.wav';
  }


  blobFirebase(dataURI){
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });
    return blob;
  }

  onPressedStart(){
    this.startRecord();

    this.displayButton = document.getElementById("myButton");
    this.button = TweenMax.to(this.displayButton, 0.2, {scale: 0, ease: Circ.easeOut});

    this.displayButton2 = document.getElementById("myButton2");
    this.button2 = TweenMax.to(this.displayButton2, 0.2, {scale: 1, ease: Circ.easeOut, delay: 0.2});


    this.animation.style.visibility = '';
    this.animation.style.visibility = 'visible';
    this.HoldDown = true;
    console.log("checks");
  }

  onPressedStop(){
    this.stopRecord();

    this.button.reverse();
    this.button2.reverse();

    this.animation.style.visibility = '';
    this.animation.style.visibility = 'hidden';
    this.HoldDown = false;
    this.ShowButton = true;
    console.log("checks");
  }

  TakeOutStatus(){
    StatusBar.hide();
  }



}
