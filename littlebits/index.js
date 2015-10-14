var five = require("johnny-five");
var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function() {
    console.log('connect')
});
socket.on('event', function(data) {});
socket.on('disconnect', function() {});

var ports = [{
    id: "A",
    port: "/dev/cu.usbmodem1411"
}, {
    id: "B",
    port: "/dev/cu.usbmodem1451"
}];

new five.Boards(ports).on("ready", function() {
    var statusThreshold = 2;
    var changeThreshold = 200;
    var checkFreq = 200;

    this.each(function(board) {
        // new five.Sensor({
        //     pin: 0,
        //     type: "digital",
        //     freq: checkFreq,
        //     threshold: changeThreshold,
        //     board: board
        // }).on("change", function() {
        //     console.log(board.id + "(D0): " + this.value);
        //     socket.emit(board.id == 'A' ? 'lot1' : 'lot4', {
        //         "status": this.value == 1 ? "free" : "occupied"
        //     });
        // });

        new five.Sensor({
            pin: "A0",
            type: "analog",
            threshold: changeThreshold,
            freq: checkFreq,
            board: board
        }).scale(0, 10).on("change", function() {
            console.log(board.id + "(A0): " + this.value);
            socket.emit(board.id == 'A' ? 'lot2' : 'lot5', {
                "status": this.value > statusThreshold ? "free" : "occupied"
            });
        });

        new five.Sensor({
            pin: "A1",
            threshold: changeThreshold,
            freq: checkFreq,
            board: board
        }).scale(0, 10).on("change", function() {
            console.log(board.id + "(A1):" + this.value);
            socket.emit(board.id == 'A' ? 'lot3' : 'lot6', {
                "status": this.value > statusThreshold ? "free" : "occupied"
            });
        });
    });
});
