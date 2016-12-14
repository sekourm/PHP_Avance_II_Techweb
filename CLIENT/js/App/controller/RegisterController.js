angular.module('myApp')
    .controller('register', function ($scope, $http, $location) {
        $scope.tryToSignup = function (username, password, email, file) {
            var data;

            var verif_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!verif_email.test(email)) {
                $scope.message = "Entrer une adresse email valide";
                return;
            }

            if (username.length < 5 || username.length > 20) {
                $scope.message = "Votre Username doit contenir entre 5 et 20 caractères.";
                return;
            }
            if (password.length < 8) {
                $scope.message = "Votre Password doit contenir minimum 8 caractères.";
                return;
            }
            if (file) {
                var photo = 'data:' + file.filetype + ';base64,' + file.base64;
                data = {username: username, password: password, email: email, photo: photo}
            } else {
                data = {username: username, password: password, email: email}
            }
            var link = 'http://localhost:8000/add/profiles';
            $http({
                method: 'POST',
                url: link,
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(success) {
                if (success.data.inscription == 'true') {
                    $location.path('/');
                }
                else {
                    $scope.message = success.data.message;
                }
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };
    });