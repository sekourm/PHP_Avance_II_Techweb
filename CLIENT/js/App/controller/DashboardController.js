angular.module('myApp')
    .controller('dashboard', function ($scope, $http, $window, $rootScope, $cookieStore, $location, $timeout, $route) {
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

            for (var k = 0; k < $scope.projectsPartages.length; k++) {
                for (var j = 0; j < $scope.personnelProjects.length; j++) {
                    if ($scope.projectsPartages[k].projects_by_projects.id == $scope.personnelProjects[j].id) {
                        $scope.projectsPartages.splice(k, 1);
                    }
                }
            }

        }, function errorCallback(error) {
            console.log('error');
        });

        $scope.CreateProjets = function (projets) {
            if (projets != undefined) {
                if (projets.length < 5 || projets.length > 20) {
                    $scope.message = "Votre Projets doit contenir entre 5 et 20 caractères.";
                    return;
                }
            } else {
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

                $timeout(function () {
                    $route.reload();
                }, 0);

            }, function errorCallback(error) {
                console.log('error');
            });
        };

        $scope.disconnect = function () {
            $cookieStore.remove('myId');
            $location.path("/register");
        };
    });