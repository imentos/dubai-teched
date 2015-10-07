function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

angular.module('mainApp', ["webcam"])
    .controller('mainController', function($rootScope, $scope, $location, $timeout, $interval) {
        var socket = io();
        var _video = null;

        $scope.devices = {};
        $scope.free = 6;
        $scope.total = 6;
        $scope.bbCanvas = $("#bbCanvas")[0];
        $scope.bbCanvasCtx = $scope.bbCanvas.getContext("2d");
        $scope.bbCanvasCtx.strokeStyle = "#FF0000";

        // video
        $scope.patOpts = {
            x: 0,
            y: 0,
            w: 50,
            h: 50
        };
        $scope.myChannel = {
            videoWidth: 320,
            videoHeight: 240,
            video: null
        };

        $interval(function() {
            $scope.makeSnapshot();
        }, 1000);

        $scope.makeSnapshot = function makeSnapshot() {
            if (_video) {
                var patCanvas = document.createElement('canvas');
                patCanvas.width = _video.width;
                patCanvas.height = _video.height;
                var ctxPat = patCanvas.getContext('2d');

                var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
                ctxPat.putImageData(idata, 0, 0);

                console.log(patCanvas.toDataURL('image/jpeg'));

                // send to server to dump the image
                socket.emit('snapshot', patCanvas.toDataURL('image/jpeg'));
            }
        };

        var getVideoData = function getVideoData(x, y, w, h) {
            var hiddenCanvas = document.createElement('canvas');
            hiddenCanvas.width = _video.width;
            hiddenCanvas.height = _video.height;
            var ctx = hiddenCanvas.getContext('2d');
            ctx.drawImage(_video, 0, 0, _video.width, _video.height);
            return ctx.getImageData(x, y, w, h);
        };

        $scope.onError = function(err) {}

        $scope.onStream = function(stream) {}

        $scope.onSuccess = function() {
            _video = $scope.myChannel.video;
            $scope.$apply(function() {
                $scope.patOpts.w = _video.width;
                $scope.patOpts.h = _video.height;
            });
        }






        //////////////////////////////////////////////////////
        $scope.updateBoundingBox = function(bboxes) {
            $scope.bbCanvasCtx.clearRect(0, 0, $scope.bbCanvas.width, $scope.bbCanvas.height);

            // // test
            // $scope.bbCanvasCtx.beginPath()
            // $scope.bbCanvasCtx.moveTo(0, 0);
            // $scope.bbCanvasCtx.lineTo(1200.0, 900.0);
            // $scope.bbCanvasCtx.lineWidth = 2;
            // $scope.bbCanvasCtx.stroke();


            for (var i = 0; i < bboxes.length; i++) {
                var bbox = bboxes[i];
                $scope.bbCanvasCtx.beginPath()
                $scope.bbCanvasCtx.rect(1200.0 * (bbox.x / 320), 900.0 * (bbox.y / 240), 1200.0 * (bbox.w / 320), 900.0 * (bbox.h / 240));
                $scope.bbCanvasCtx.lineWidth = 2;
                $scope.bbCanvasCtx.stroke();
            }
        }

        $scope.updateRatio = function() {
            var occupied = $scope.total - $scope.free;
            var percentage = 100 * (occupied / $scope.total);
            Circles.create({
                id: 'ratioDiv',
                percentage: parseFloat(percentage).toFixed(0),
                radius: 80,
                width: 10,
                number: percentage,
                text: '%',
                colors: ['#888', '#F00']
            });
        }

        $scope.updateTraffic = function(carCount) {
            var canvas = document.getElementById("trafficCanvas");
            var ctx = canvas.getContext("2d");
            // if (carCount < 3) {
            //     ctx.strokeStyle = "#00FF00";
            // } else if (carCount >= 3 && carCount < 5) {
            //     ctx.strokeStyle = "#FFFF00";
            // } else if (carCount >= 5) {
            //     ctx.strokeStyle = "#FF0000";
            // }
            // ctx.beginPath();
            // ctx.moveTo(0, 0);
            // ctx.lineWidth = 5;
            // ctx.lineTo(300, 150);
            // ctx.stroke();

            var imageObj = new Image();
            imageObj.onload = function() {
                ctx.drawImage(imageObj, 350, 60, 666, 468);
            };
            imageObj.src = 'Path.png';
        }

        // test
        $scope.updateTraffic(4);
        $('#popover').popover({
            container: ".livefeed"
        });

        $scope.updateRatio();



        //////////////////////////////////////////////////////
        // socket.io
        for (var i = 1; i <= 6; i++) {
            (function(index) {
                socket.on('lot' + index, function(msg) {
                    console.log(msg);
                    if (msg.status) {
                        if (msg.status == "free") {
                            $scope.free++;
                        } else {
                            $scope.free--;
                        }

                        if ($scope.free < 0) {
                            $scope.free++;
                            alert("Cannot be less than zero")
                            return;
                        }

                        if ($scope.free > $scope.total) {
                            $scope.free--;
                            alert("Only two parking lots")
                            return;
                        }

                        // logic for popup
                        $('#popover').popover({
                            container: ".livefeed"
                        });
                        eventFire($("#popover")[0], "click");
                        $timeout(function() {
                            $('#popover').popover('destroy');
                        }, 3000);

                        $scope.updateRatio();
                    }
                });
            })(i);
        }

        socket.on('bbox', function(msg) {
            $scope.$apply(function() {
                console.log(msg);

                $scope.updateBoundingBox(msg);

                $scope.updateTraffic(msg.length);
            });
        });
    });
