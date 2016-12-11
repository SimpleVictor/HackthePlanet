var express = require('express');
var router = express.Router();

var NanoTimer = require('nanotimer');

var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
    io: new Edison()
});
var requests = require('request');




var timer = new NanoTimer();
timer.setInterval(countDown, '', '1s');
var count = '10';

var isUserInside = false;

board.on("ready", function() {

    var motion = new five.Motion(6);

    motion.on("calibrated", function() {
        console.log("calibrated");
    });




    motion.on("motionstart", function() {
        if(!isUserInside){
            UserIsInside()
        }

        console.log("motionstart")
        isUserInside = true;
        count = 10;
    });


    motion.on("motionend", function() {
        console.log("motionend");
        if(count <= 1){
            timer.setInterval(countDown, '', '1s');
        }
    });


});

function countDown(){
    console.log("The count is " + count);
    count--;
    if(count <= 0){
        UserIsNotInside();
        count = 10;
        isUserInside = false;
    }
};







function UserIsNotInside(){
    var obj = {
        active: '1',
        respond: 'user is not home'
    }

    requests({
        url: 'https://wrinkle-8419a.firebaseio.com/Listener/InHouseUser/.json',
        method: "PATCH",
        body: obj,
        json: true,
    }, function(err, response){
        if(err){
            console.log(err);
            console.log("There was an error");
        }else{
            console.log("Successfully added into db");
        };
    });
}

function UserIsInside(){
    var obj = {
        active: '1',
        respond: 'user is home'
    }

    requests({
        url: 'https://wrinkle-8419a.firebaseio.com/Listener/InHouseUser/.json',
        method: "PATCH",
        body: obj,
        json: true,
    }, function(err, response){
        if(err){
            console.log(err);
            console.log("There was an error");
        }else{
            console.log("Successfully added into db");
        };
    });
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
