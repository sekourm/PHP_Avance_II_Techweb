angular.module('myApp')
    .controller('dashboard', function ($scope, $http, $window, $rootScope, $cookieStore, $location) {
        console.log("controller dashboard charge");

        var myId = $cookieStore.get('myId');
        if (!myId) {
            $location.path("/register");
        }

        var link = 'http://localhost:8000/show/project';
        var data = {userId: myId};
        $http({
            method: 'POST', url: link, data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(data) {
          $scope.personnelProjects = data.data[0].users_projects;
          $scope.projectsPartages = data.data[0].projects_by_users;
          console.log($scope.projectsPartages);


        }, function errorCallback(error) {
            console.log('error');
        });

        $scope.CreateProjets = function (projets) {
            console.log(projets);
            if(projets != undefined){
               if (projets.length < 5 || projets.length > 20) {
                    $scope.message = "Votre Projets doit contenir entre 5 et 20 caractères.";
                    return;
                }
            } else{
                $scope.message = "Votre Projets doit contenir entre 5 et 20 caractères.";
                return;
            }
            var link = 'http://localhost:8000/add/project';
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
    });