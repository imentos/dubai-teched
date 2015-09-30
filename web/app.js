angular.module('PubNubAngularApp', ["pubnub.angular.service"])
    .controller('ChatCtrl', function($rootScope, $scope, $location, PubNub, $interval) {
        $scope.devices = {};
        $scope.freeCount = 1;

        // $interval(function() {
        //     console.log("time");
        //     $scope.image = "http://localhost:8080/images/flower.png";
        // }, 1000);

        // make up a channel name
        $scope.channel = 'Parking Lot 1';

        if (!$rootScope.initialized) {
            // Initialize the PubNub service
            PubNub.init({
                subscribe_key: 'sub-c-22a3eac0-0971-11e5-bf9c-0619f8945a4f',
                publish_key: 'pub-c-c9bc3d23-4bc7-44a7-a1dc-c2d1f9445a25'
            });
            $rootScope.initialized = true;
        }

        // Subscribe to the Channel
        PubNub.ngSubscribe({
            channel: $scope.channel
        });

        // Register for message events
        $rootScope.$on(PubNub.ngMsgEv($scope.channel), function(ngEvent, payload) {
            $scope.$apply(function() {
                console.log(payload.message);
                if (payload.message.status) {
                    if (payload.message.status == "free") {
                        $scope.freeCount++;
                    } else {
                        $scope.freeCount--;
                    }
                }
            });
        });
    });
