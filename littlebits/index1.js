var five = require("johnny-five");
var socket = require('socket.io-client')('http://10.48.19.240:3000');
socket.on('connect', function() {
    console.log('connect')
});
socket.on('event', function(data) {});
socket.on('disconnect', function() {});
board = new five.Board();
board.on("ready", function() {
    new five.Sensor({
        pin: 0,
        type: "digital",
        threshold: 500
    }).on("change", function() {
        console.log(this.value);
    })
});
