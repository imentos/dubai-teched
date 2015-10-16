var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");
var config = require('./config.json');
var counter = 0;

app.use(express.static('web'));
app.get('/', function(req, res) {
    res.sendfile('index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('snapshot', function(msg) {
        var base64Data = msg.replace(/^data:image\/jpeg;base64,/, "");
        fs.writeFile(config.imageLocation + "out" + counter++ + ".jpg", base64Data, 'base64', function(err) {
            console.log(err);
        });
    });

    // receive from littlebits, and send back to website
    for (var i = 1; i <= 6; i++) {
        (function(index) {
            socket.on('lot' + index, function(msg) {
                console.log('lot' + index + ":" + msg.status);
                io.emit('lot' + index, msg);
            });
        })(i);
    }

    // from karthik
    socket.on('car', function(msg) {
        console.log(msg);
        // send back to web page
        io.emit('car', msg);
    });

    socket.on('dog', function(msg) {
        console.log(msg);
        // send back to web page
        io.emit('dog', msg);
    });

    socket.on('horse', function(msg) {
        console.log(msg);
        // send back to web page
        io.emit('horse', msg);
    });

    socket.on('sheep', function(msg) {
        console.log(msg);
        // send back to web page
        io.emit('sheep', msg);
    });

    socket.on('cow', function(msg) {
        console.log(msg);
        // send back to web page
        io.emit('cow', msg);
    });

    socket.on('bird', function(msg) {
        console.log(msg);
        // send back to web page
        io.emit('bird', msg);
    });

    socket.on('person', function(msg) {
        console.log(msg);
        // send back to web page
        io.emit('person', msg);
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
