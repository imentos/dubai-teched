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
    port: "/dev/cu.usbmodem14131"
}, {
    id: "B",
    port: "/dev/cu.usbmodem14151"
}, {
    id: "C",
    port: "/dev/cu.usbmodem141741"
}];

var mappingA0 = {};
mappingA0["A"] = 'lot1';
mappingA0["B"] = 'lot3';
mappingA0["C"] = 'lot5';

var mappingA1 = {};
mappingA1["A"] = 'lot2';
mappingA1["B"] = 'lot4';
mappingA1["C"] = 'lot6';

new five.Boards(ports).on("ready", function() {
    var statusThreshold = config.statusThreshold;
    var changeThreshold = config.changeThreshold;
    var checkFreq = config.checkFreq;

    this.each(function(board) {
        new five.Sensor({
            pin: "A0",
            type: "analog",
            threshold: changeThreshold,
            freq: checkFreq,
            board: board
        }).scale(0, 10).on("change", function() {
            console.log(board.id + "(A0->"+ mappingA0[board.id] + "): " + this.value);
            socket.emit(mappingA0[board.id], {
                "status": this.value > statusThreshold ? "free" : "occupied"
            });
        });

        new five.Sensor({
            pin: "A1",
            threshold: changeThreshold,
            freq: checkFreq,
            board: board
        }).scale(0, 10).on("change", function() {
            console.log(board.id + "(A1->" + mappingA1[board.id] + ):" + this.value);
            socket.emit(mappingA1[board.id], {
                "status": this.value > statusThreshold ? "free" : "occupied"
            });
        });
    });
});
