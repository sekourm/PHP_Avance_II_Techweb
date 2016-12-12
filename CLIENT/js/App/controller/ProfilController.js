angular.module('myApp')

    .controller('profil', function($scope, $http, $window, $rootScope, $cookieStore, $location) {

      console.log("controller profil charge");
      var myId = $cookieStore.get('myId');


      var link = 'http://localhost:8000/show/profiles/' + myId;

      $http({
        method: 'POST',
        url: link,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(function successCallback(data) {
        console.log('success', data);
        $scope.photo = data.data['photo'];
        $scope.name = data.data['name'];
        $scope.lastname = data.data['lastname'];
        $scope.email = data.data['email'];
        $scope.theme = data.data['theme'];
        $scope.biographie = data.data['biographie'];

      }, function errorCallback(error) {
        console.log('error', error);
      });


      $scope.UpdateProfil = function(name, lastname, email, biographie) {
        var link = 'http://localhost:8000/update/profiles';
        var data = { name: name, lastname: lastname, email: email, biographie: biographie, profile_id: myId };

        $http({
          method: 'POST',
          url: link,
          data: data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function successCallback(data) {
          console.log('success', data);
        }, function errorCallback(error) {
          console.log('error', error);
        });

      };

      $scope.trigger = function(file) {
        console.log('eee', file);
        var link = 'http://localhost:8000/update/photos';
        var photo = 'data:' + file.filetype + ';base64,' + file.base64;
        var data = { photo: photo, profile_id: myId };
        $http({
          method: 'POST',
          url: link,
          data: data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function successCallback(data) {
          console.log('success', data);
        }, function errorCallback(error) {
          console.log('error', error);
        });

      };

      $scope.ChangeBlue = function() {
        console.log('blue');
        var link = 'http://localhost:8000/update/themes';
        var data = { theme: 'blue', profile_id: myId };
        $http({
          method: 'POST',
          url: link,
          data: data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function successCallback(data) {
          console.log('success', data);
        }, function errorCallback(error) {
          console.log('error', error);
        });
        $scope.theme = 'blue';
      };
      $scope.ChangeRed = function() {
        console.log('red');
        var link = 'http://localhost:8000/update/themes';
        var data = { theme: 'red', profile_id: myId };
        $http({
          method: 'POST',
          url: link,
          data: data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function successCallback(data) {
          console.log('success', data);
        }, function errorCallback(error) {
          console.log('error', error);
        });
        $scope.theme = 'red';
      };
      $scope.ChangePurple = function() {
        console.log('purple');
        var link = 'http://localhost:8000/update/themes';
        var data = { theme: 'purple', profile_id: myId };
        $http({
          method: 'POST',
          url: link,
          data: data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function successCallback(data) {
          console.log('success', data);
        }, function errorCallback(error) {
          console.log('error', error);
        });
        $scope.theme = 'purple';
      };
      $scope.ChangeOrange = function() {
        console.log('orange');
        var link = 'http://localhost:8000/update/themes';
        var data = { theme: 'orange', profile_id: myId };
        $http({
          method: 'POST',
          url: link,
          data: data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function successCallback(data) {
          console.log('success', data);
        }, function errorCallback(error) {
          console.log('error', error);
        });
        $scope.theme = 'orange';
      };
      $scope.ChangeGreen = function() {
        console.log('green');
        var link = 'http://localhost:8000/update/themes';
        var data = { theme: 'green', profile_id: myId };
        $http({
          method: 'POST',
          url: link,
          data: data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function successCallback(data) {
          console.log('success', data);
        }, function errorCallback(error) {
          console.log('error', error);
        });
        $scope.theme = 'green';
      };
      $scope.ChangeAzure = function() {
        console.log('azure');
        var link = 'http://localhost:8000/update/themes';
        var data = { theme: 'azure', profile_id: myId };
        $http({
          method: 'POST',
          url: link,
          data: data,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function successCallback(data) {
          console.log('success', data);
        }, function errorCallback(error) {
          console.log('error', error);
        });
        $scope.theme = 'azure';
      };
    });