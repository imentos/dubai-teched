var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");
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
        fs.writeFile("out.jpg", base64Data, 'base64', function(err) {
            console.log(err);
        });
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
