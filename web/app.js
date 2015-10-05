function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

angular.module('mainApp', ["pubnub.angular.service", "webcam"])
    .controller('mainController', function($rootScope, $scope, $location, PubNub, $timeout) {
        $scope.devices = {};
        $scope.free = 2;
        $scope.total = 2;
        $scope.bbCanvas = $("#bbCanvas")[0];
        $scope.bbCanvasCtx = $scope.bbCanvas.getContext("2d");
        $scope.bbCanvasCtx.strokeStyle = "#FF0000";

        $scope.updateRatio = function() {
            var occupied = $scope.total - $scope.free;
            var percentage = 100 * (occupied / $scope.total);
            Circles.create({
                id: 'ratioDiv',
                percentage: percentage,
                radius: 80,
                width: 10,
                number: percentage,
                text: '%',
                colors: ['#888', '#F00']
            });
        }

        $scope.updateTraffic = function() {
            var canvas = document.getElementById("trafficCanvas");
            canvas.style.top = "-10px";
            canvas.style.left = "-10px";
            canvas.style.position = "absolute";
            var ctx = canvas.getContext("2d");
            ctx.strokeStyle = "#FF0000";
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineWidth = 1;
            ctx.lineTo(300, 150);
            ctx.stroke();
        }

        $scope.updateBoundingBox = function(bboxes) {
            $scope.bbCanvasCtx.clearRect(0, 0, $scope.bbCanvas.width, $scope.bbCanvas.height);
            for (var i = 0; i < bboxes.length; i++) {
                var bbox = bboxes[i];
                $scope.bbCanvasCtx.beginPath()
                $scope.bbCanvasCtx.rect(1200.0 * (bbox.x / 8.33) / 489, 900.0 * (bbox.y / 8.33) / 367, 1200.0 * (bbox.w / 8.33) / 489, 900.0 * (bbox.h / 8.33) / 367);
                $scope.bbCanvasCtx.lineWidth = 2;
                $scope.bbCanvasCtx.stroke();
            }
        }

        $scope.updateTraffic();

        // test
        $('#popover').popover({
            container: ".livefeed"
        });

        $scope.updateRatio();

        if (!$rootScope.initialized) {
            // Initialize the PubNub service
            PubNub.init({
                subscribe_key: 'sub-c-22a3eac0-0971-11e5-bf9c-0619f8945a4f',
                publish_key: 'pub-c-c9bc3d23-4bc7-44a7-a1dc-c2d1f9445a25'
            });
            $rootScope.initialized = true;
        }




        // bounding box sockets
        PubNub.ngSubscribe({
            channel: 'bbox'
        });
        $rootScope.$on(PubNub.ngMsgEv('bbox'), function(ngEvent, payload) {
            $scope.$apply(function() {
                console.log(payload.message);
                $scope.updateBoundingBox(payload.message);
            });
        });

        // parking sockets
        PubNub.ngSubscribe({
            channel: 'Parking Lot 1'
        });
        $rootScope.$on(PubNub.ngMsgEv('Parking Lot 1'), function(ngEvent, payload) {
            $scope.$apply(function() {
                console.log(payload.message);
                if (payload.message.status) {
                    if (payload.message.status == "free") {
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
        });
    });
