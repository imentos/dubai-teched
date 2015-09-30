var five = require("johnny-five"),
    board, led, button;
var channel = 'Parking Lot 1';
var pubnub = require('pubnub').init({
    publish_key: 'pub-c-c9bc3d23-4bc7-44a7-a1dc-c2d1f9445a25',
    subscribe_key: 'sub-c-22a3eac0-0971-11e5-bf9c-0619f8945a4f',
});


var request = require('request');
 
var options = {
  url: 'https://iotmmsi818292trial.hanatrial.ondemand.com/com.sap.iotservices.mms/v1/api/http/data/492b19c8-933d-4e9d-9992-87be148ebd3a',
  headers: {
    'Authorization': 'Bearer 498e4e3d4628342659ffc8c48172e8a9'
  }
};
 
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info.stargazers_count + " Stars");
    console.log(info.forks_count + " Forks");
  }
}
 
request(options, callback);



board = new five.Board();
board.on("ready", function() {
    led = new five.Led(5);
    button = new five.Switch(0);

    button.on("open", function(value) {
        console.log(channel + ":occupied");
        led.off();

        pubnub.publish({
            channel: channel,
            message: {
                "status": "occupied"
            }
        });
    });

    button.on("close", function(value) {
        console.log(channel + ":free");
        led.on();

        pubnub.publish({
            channel: channel,
            message: {
                "status": "free"
            }
        });
    });
});
