angular.module('myApp')
    .controller('login', function ($scope, $http, $window, $rootScope, $cookieStore, $location) {
        $scope.tryToLogin = function (email, password) {
            var link = 'http://localhost:8000/authentification/profiles';
            var verif_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!verif_email.test(email)) {
                $scope.message = "Entrer une adresse email valide";
                return;
            }
            if (password.length == 0) {
                $scope.message = "Entrer un mot de passe";
                return;
            }
            $http({
                method: 'POST', url: link, data: {email: email, password: password},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(data) {
                if (data.data.connexion == 'false') {
                    $scope.message = data.data.message;
                    return;
                }
                var myId = data.data.Id;
                $cookieStore.put('myId', myId);
                $location.path("/dashboard");
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };
    });