var express = require('express');
var router = express.Router();
var requests = require('request');

/* GET users listing. */

router.get('/home', function(req, res, next) {

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
            res.json("failed");

        }else{
            console.log("Successfully added into db");
            res.json("It works");
        };
    });

});


router.get('/nothome', function(req, res, next) {

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
            res.json("failed");

        }else{
            console.log("Successfully added into db");
            res.json("It works");
        };
    });

});

module.exports = router;
