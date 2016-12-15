angular.module('myApp')
    .controller('verification', function ($scope, $http, $window, $rootScope, $cookieStore, $location, $route, $timeout,$routeParams) {
        console.log("controller verification charge");
        var userId = $routeParams.userId;
        var privateKey = $routeParams.privateKey;
        var link = 'http://localhost:8000/Verify/Account/'+userId+'/'+privateKey;
        //var data = {userId: userId, privateKey: privateKey};
        //console.log(data);
        $http({
            method: 'POST',
            url: link,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(success) {
            if(success.data.activation == 'true'){
                $location.path('/');
            }
            $scope.message = success.data.message;

        }, function errorCallback(error) {
            console.log(error);
        })

    });