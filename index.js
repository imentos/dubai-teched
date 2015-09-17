var five = require("johnny-five"),
    board, led, button;
var channel = 'Parking Lot 1';
var pubnub = require('pubnub').init({
    publish_key: 'pub-c-ed90ad60-ccaa-487f-82b7-f731df7b8425',
    subscribe_key: 'sub-c-2427eec6-0978-11e5-bf9c-0619f8945a4f'
});

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
