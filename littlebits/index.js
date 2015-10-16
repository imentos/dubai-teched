var five = require("johnny-five");
var socket = require('socket.io-client')('http://localhost:3000');
var config = require('./config.json');

socket.on('connect', function() {
    console.log('connect')
});
socket.on('event', function(data) {});
socket.on('disconnect', function() {});

var ports = [{
    id: "A",
    port: config.port
}];

new five.Boards(ports).on("ready", function() {
    this.each(function(board) {
        for (var i = 0; i < 6; i++) {
            (function(index) {
                new five.Sensor({
                    pin: "A" + i,
                    type: "analog",
                    threshold: config.changeThreshold,
                    freq: config.checkFreq,
                    board: board
                }).scale(0, 10).on("change", function() {
                    console.log(board.id + "(A" + index + "->lot" + (index + 1) + "): " + this.value);
                    socket.emit('lot' + (index + 1), {
                        "status": this.value < config.statusThreshold ? "free" : "occupied"
                    });
                });
            })(i);
        }
    });
});
