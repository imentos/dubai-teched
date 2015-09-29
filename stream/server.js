var pubnub = require("pubnub")
var p = pubnub.init({
    "publish_key": "pub-c-c9bc3d23-4bc7-44a7-a1dc-c2d1f9445a25",
    "subscribe_key": "sub-c-22a3eac0-0971-11e5-bf9c-0619f8945a4f",
    "secret_key": "sec-c-NGQ0MzU5NTUtMWYxZi00YTBiLWIzNGEtZDBhNmFlY2JkZTFi",
    "params": {}
    //proxy: {hostname:'proxy', port:8080}
});
p.grant({
    "callback": function(m) {
        console.log(m);
    },
    "error": function(e) {
        console.error(e);
    },
});

var fs = require('fs');
fs.readdir(__dirname + "/images", function(err, files) {
    if (err) throw err;

    var timeout = 0;

    files.filter(function(file) {
        return file.substr(-4) === '.jpg';
    }).forEach(function(name) {

        var path = __dirname + '/images/' + name;

        (function(x) {
            setTimeout(function() {
                console.log(x);
                p.publish({
                    message: {
                        image: x
                    }, 
                    channel: "test"
                });
            }, timeout)
        })(name);

        timeout += 1000
    });
});
