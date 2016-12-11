import {Component, AfterViewInit, NgZone} from "@angular/core";
import {ServerService} from "../../provider/ServerService";

declare var firebase;
declare var responsiveVoice;
declare var $;

@Component({
    selector: "home",
    styleUrls: ['client/modules/home/home.component.css'],
    templateUrl: `client/modules/home/home.component.html`
})
export class HomeComponent implements AfterViewInit {

    randomVoice = "assets/mp3/static/1.wav";

    zone;
    // aud;


    //True Means the client is in the house
    InHouse;
    InHouseToggle: boolean = true;



    mainResponse;

    constructor(private serverService: ServerService) {

        console.log("2");

    }

    ngAfterViewInit(){

        this.InHouse = document.getElementsByClassName("inHouseToggle");
        console.log(this.InHouse);




        this.zone = new NgZone({enableLongStackTrace: false});
        let valueChanged = firebase.database().ref("/Listener");



        valueChanged.on("value", (snapshot) => {

            let obj = snapshot.val();
            console.log(obj);

            // this.CheckAtStartUp(obj);

            this.zone.run(() => {
                Object.keys(obj).forEach((key) => {
                    if(key !== "AddMorePills"){
                        if(obj[key].active === 1){
                            this[key](key, obj);
                        }
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

    CheckAtStartUp(obj){
        let respond = obj.InHouseUser.respond;
        console.log("Got here");
        console.log(respond);



        if(respond === 'user is not home'){
            this.InHouse[0].className = "toggle off icon inHouseToggle";
            this.InHouseToggle = false;
            // this.refreshSkill(skill);
        }else{
            this.InHouse[0].className = "toggle on icon inHouseToggle";
            this.InHouseToggle = true;
            // this.refreshSkill(skill);
        }


    }

    SetUpTimer(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkill(skill);
    }

    PlayTest(){
        let aud:any = document.getElementById('message6');
        console.log(aud.volume);
        aud.play();
    }


    //ALERT SOUND BEFORE ANY MESSAGE COMES UP
    PlayAlertSound(callback){
        let aud:any = document.getElementById('alert1');
        aud.play();
        setTimeout(() => {
            callback();
        }, 1000);
        // aud.addEventListener("ended", () => {
        //     console.log("ended");
        //     callback();
        // });
    }

    //YOUR DOCTOR HAS A MESSAGE FOR U
    PlayMessage1(skill, key) {
        console.log(`You just called ${skill}`);


        let response = key[skill].respond;
        this.mainResponse = key[skill].respond;

        console.log(response);
        //Make sure the user is home first
        if(this.InHouseToggle){
            this.PlayAlertSound(() => {
                    let aud:any = document.getElementById("message1");
                    aud.play();

                setTimeout(() => {
                    let aud1:any = document.getElementById("randomVoice");
                    aud1.src = response;
                    aud1.play();
                }, 3000);
            });
        };

        this.refreshSkill(skill);
    }

    //This is a friendly reminder to take your pill in 10 minutes.
    PlayMessage2(skill, key) {

        console.log(`You just called ${skill}`);

        let response = key[skill].respond;


        this.PlayAlertSound(() => {
            let aud2:any = document.getElementById(response);
            aud2.play();
        })

        this.refreshSkill(skill);
    }

    //You have a total of 21 pills left for today.
    PlayMessage3(skill, key) {
        console.log(`You just called ${skill}`);

        let response = key[skill].respond;


        this.PlayAlertSound(() => {
            let aud3:any = document.getElementById(response);
            aud3.play();
        })

        this.refreshSkill(skill);
    }

    //It seems like you are running out of pills soon. Will you like to contact your doctor for more?
    PlayMessage4(skill , key) {

        console.log(`You just called ${skill}`);

        let response = key[skill].respond;


        this.PlayAlertSound(() => {
            let aud4:any = document.getElementById(response);
            aud4.play();
        })

        this.refreshSkill(skill);
    }

    PlayMessage5(skill){

        this.PlayAlertSound(() => {
            let aud:any = document.getElementById('message5');
            aud.play();
        })

        this.refreshSkill(skill);
    }

    PlayMessage6(skill){

        this.PlayAlertSound(() => {
            let aud:any = document.getElementById('message6');
            aud.play();
        })

        this.refreshSkill(skill);
    }

    InHouseUser(skill, respond){
        let myResponse = respond[skill].respond;
        console.log(myResponse);
        if(myResponse === 'user is not home'){
            this.InHouse[0].className = "toggle off icon inHouseToggle";
            this.InHouseToggle = false;
        }else{
            this.InHouse[0].className = "toggle on icon inHouseToggle";
            this.InHouseToggle = true;
            if(this.mainResponse){
                this.PlayAlertSound(() => {
                    let aud:any = document.getElementById("message1");
                    aud.play();
                    setTimeout(() => {
                        let aud1:any = document.getElementById("randomVoice");
                        aud1.src = this.mainResponse;
                        aud1.play();
                    }, 3000);
                });
            };
        }

        this.refreshSkill(skill);
        //
        // if(this.InHouseToggle){
        //     this.InHouse[0].className = "toggle off icon inHouseToggle";
        //     this.InHouseToggle = false;
        //     this.refreshSkill(skill);
        // }else{
        //     this.InHouse[0].className = "toggle on icon inHouseToggle";
        //     this.InHouseToggle = true;
        //     if(this.mainResponse){
        //         this.PlayAlertSound(() => {
        //             console.log("Went in here");
        //             console.log(this.mainResponse);
        //             let aud:any = document.getElementById("message1");
        //             aud.play();
        //
        //
        //             setTimeout(() => {
        //                 let aud1:any = document.getElementById("randomVoice");
        //                 aud1.src = this.mainResponse;
        //                 aud1.play();
        //             }, 3000);
        //         });
        //     };
        //     this.refreshSkill(skill);
        // }

    }













    getAudio(){
        // var fileTBU = document.getElementById('audio');
        var fileTBU = document.getElementsByClassName('audio');
        console.log(fileTBU);
        // var stroageRef = firebase.storage().ref(fileTBU.name);
        // var task = stroageRef.put(fileTBU);


        // responsiveVoice.setDefaultVoice("US English Female");
        // console.log(responsiveVoice.getVoices());
        // responsiveVoice.speak("Like a somebody");

    }

}













