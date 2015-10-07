var five = require("johnny-five"),
    board;
var socket = require('socket.io-client')('http://localhost:3000');
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
        socket.emit('lot1', {
            "status": this.value == 1 ? "free" : "occupied"
        });
    });

    new five.Sensor({
        pin: "A1",
        threshold: 500
    }).scale(0, 10).on("change", function() {
        console.log(this.value);
        socket.emit('lot2', {
            "status": this.value > 8 ? "free" : "occupied"
        });
    });
});
