angular.module('PubNubAngularApp', ["pubnub.angular.service"])
    .controller('ChatCtrl', function($rootScope, $scope, $location, PubNub, $interval) {
        $scope.devices = {};
        $scope.free = 2;
        $scope.total = 2;
        $scope.channel = 'Parking Lot 1';

        $(document).ready(function() {
            $('[data-toggle="popover"]').popover();
        });


        Circles.create({
            id: 'circles-1',
            percentage: 0,
            radius: 80,
            width: 10,
            number: 0,
            text: '%',
            colors: ['#FFF', '#E20613']
        });

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
                        $scope.free++;
                    } else {
                        $scope.free--;
                    }

                    var occupied = $scope.total - $scope.free;
                    var percentage = 100 * (occupied / $scope.total);
                    Circles.create({
                        id: 'circles-1',
                        percentage: percentage,
                        radius: 80,
                        width: 10,
                        number: percentage,
                        text: '%',
                        colors: ['#888', '#F00']
                    });
                }
            });
        });
    });
