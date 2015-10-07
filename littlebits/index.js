var five = require("johnny-five"),
    board, led, button;
var channel = 'Parking Lot 1';
var pubnub = require('pubnub').init({
    publish_key: 'pub-c-c9bc3d23-4bc7-44a7-a1dc-c2d1f9445a25',
    subscribe_key: 'sub-c-22a3eac0-0971-11e5-bf9c-0619f8945a4f',
    //proxy: {hostname:'proxy', port:8080}
});

var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function() {
    console.log('connect')
});
socket.on('event', function(data) {});
socket.on('disconnect', function() {});

board = new five.Board();
board.on("ready", function() {
    led = new five.Led(5);
    button = new five.Switch(0);

    button.on("open", function(value) {
        console.log(channel + ":occupied");
        led.off();

        socket.emit(channel, {
            "status": "occupied"
        });
    });

    button.on("close", function(value) {
        console.log(channel + ":free");
        led.on();

        socket.emit(channel, {
            "status": "free"
        });
    });
});
