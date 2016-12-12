angular.module('myApp')
    .controller('dashboard', function ($scope, $http, $window, $rootScope, $cookieStore, $location) {
        console.log("controller dashboard charge");
        var myId = $cookieStore.get('myId');
        if (!myId) {
            $location.path("/register");
        }

        $scope.CreateProjets = function (projets) {

            console.log(projets.length);

            if (projets.length < 5 || projets.length > 20) {
                $scope.message = "Votre Projets doit contenir entre 5 et 20 caractères.";
                return;
            }

            var link = 'http://localhost:8000/create/projets';
            var data = {name: projets, userId: myId};
            $http({
                method: 'POST', url: link, data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(data) {
                console.log(data);
            }, function errorCallback(error) {
                console.log('error');
            });
        };

        $scope.disconnect = function () {
            $cookieStore.remove('myId');
            $location.path("/register");
        };
        /* var link = 'http://localhost:8000/show/profiles/' + myId;
         $http({method: 'POST', url: link, data:myId,
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).then(function successCallback(data) {
         console.log(data);
         }, function errorCallback(error) {
         console.log('error');
         });*/
    });