var five = require("johnny-five"),
  board, photoresistor;

board = new five.Board();

board.on("ready", function() {

  // Create a new `photoresistor` hardware instance.
  photoresistor1 = new five.Sensor({
    pin: "A2",
    freq: 250
  });
  photoresistor1.on("data", function() {
    console.log("p1:"+this.value);
  });


  photoresistor2 = new five.Sensor({
    pin: "A1",
    freq: 250
  });
  photoresistor2.on("data", function() {
    console.log("p2:"+this.value);
  });
    // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  // board.repl.inject({
  //   pot: photoresistor
  // });

  // "data" get the current reading from the photoresistor

});