angular.module('myApp')
    .controller('project', function ($scope, $http, $window, $rootScope, $cookieStore, $location, $route, $timeout,$routeParams) {
        console.log("controller project charge");

        var id_params = $routeParams.id;
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
            var test = [];
            var element = {};
            $scope.personnelProjects = data.data[0].users_projects;

            for (var h = 0; h < $scope.personnelProjects.length; h++) {
                if($scope.personnelProjects[h].id == id_params){
                    $scope.essay = $scope.personnelProjects[h];
                }
            }

          for (var i = 0; i < $scope.personnelProjects.length; i++) {
              if($scope.personnelProjects[i].id == id_params){
                  for(var j = 0; j < $scope.personnelProjects[i].categories_by_projects.length;j++){
                      var test2 =  $scope.personnelProjects[i].categories_by_projects[j].name;
                      element[test2] = [[],[ $scope.personnelProjects[i].categories_by_projects[j].id]];
                      test.push({ [test2]: [], id: $scope.personnelProjects[i].categories_by_projects[j].id})
                  }
              }
            }

            var tab_sous_tache = [];
            var tab_users_in_tache = [];
            var count_checked = 0;

            $scope.models = { selected: null, lists: element };

            Object.keys($scope.models.lists).forEach(function(key) {
                for (var i = 0; i < $scope.personnelProjects.length; i++) {
                    if($scope.personnelProjects[i].id == id_params){
                        for(var j = 0; j < $scope.personnelProjects[i].categories_by_projects.length;j++){
                            for(var k = 0; k< $scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks.length;k++){
                                if ($scope.models.lists[key][1][0] == $scope.personnelProjects[i].categories_by_projects[j].id) {
                                  var countTache = $scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks.length;
                                  if(countTache > 0){
                                      var result = 100/countTache;
                                  }
                                    for(var m = 0; m <$scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks.length;m++){
                                        for(var n = 0; n < $scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks[m].tasks_by_sub_tasks.length;n++){
                                        tab_users_in_tache.push({
                                            id:$scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks[m].tasks_by_sub_tasks[n].users_by_sub_tasks.id,
                                            username:$scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks[m].tasks_by_sub_tasks[n].users_by_sub_tasks.username,
                                            picture:$scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks[m].tasks_by_sub_tasks[n].users_by_sub_tasks.picture,
                                            email:$scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks[m].tasks_by_sub_tasks[n].users_by_sub_tasks.email
                                        })
                                        }
                                        tab_sous_tache.push({
                                            id:$scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks[m].id,
                                            description:$scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks[m].description,
                                            val:result,
                                            checked:$scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks[m].checked
                                        });

                                        if($scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks[m].checked == true)
                                        {
                                            count_checked = count_checked + result;
                                        }
                                    }

                                    $scope.models.lists[key][0].push({
                                        label: $scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].name,
                                        id: $scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].id,
                                        sous_tache:[tab_sous_tache],
                                        users_in_tache:[tab_users_in_tache],
                                        count_checked: [count_checked]
                                    });

                                    count_checked = 0;
                                    tab_sous_tache = [];
                                    tab_users_in_tache = [];
                                }
                            }
                        }
                    }
                }
            });
        }, function errorCallback(error) {
            console.log('error');
        });

        $scope.dropCallback2 = function(item, list, index)
        {
            var categorieId = list[1][0];
            var taskId = list[0][index].id;

            var link = 'http://localhost:8000/update/tasks';
            $http({
                method: 'POST',
                url: link,
                data: {'categorieId': categorieId, 'taskId': taskId},
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function successCallback(success) {
            }, function errorCallback(error) {
            });
        };

        $scope.createCategories = function (nameCategorie)
        {
            if (nameCategorie == '' || nameCategorie == undefined) {
                return;
            }

            var link = 'http://localhost:8000/create/categorie';
            $http({
                method: 'POST',
                url: link,
                data: {'nameCategorie': nameCategorie, 'projectId': id_params},
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function successCallback(success) {
                $timeout(function() {
                    $route.reload();
                }, 0);
            }, function errorCallback(error) {
                console.log(error);
            });
        };

        $scope.showmodifytasks = false;
        $scope.tasksShow = false;

        $scope.showKids = function(index) {
            $scope.tasksShow = true;
            $scope.activeParentIndex = index;
        };

        $scope.isShowing = function(index) {
            return $scope.activeParentIndex === index;
        };

        $scope.changeTasks = function(list) {
            $scope.tasksShow = false;
        };

        $scope.CreateTasks = function(categorieId, nameTasks) {

           if (nameTasks == '' || nameTasks == undefined) {
                return;
            }

            var link = 'http://localhost:8000/create/tasks';
            $http({
                method: 'POST',
                url: link,
                data: {'categorieId': categorieId[0], 'nameTasks': nameTasks},
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function successCallback(success) {
                $scope.tasksShow = false;
                $timeout(function() {
                    $route.reload();
                }, 0);
            }, function errorCallback(error) {
            });
        };

        $scope.modifyTasksName = function(taskId,nameTasks) {
           var link = 'http://localhost:8000/modify/name/tasks';
            $http({
                method: 'POST',
                url: link,
                data: {'taskId': taskId, 'nameTasks': nameTasks},
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function successCallback(success) {

            }, function errorCallback(error) {
                console.log(error);
            });
        };

        $scope.addTache = function (taskId,nameSubTasks,categorieName)
        {
            var link = 'http://localhost:8000/create/subtasks';
            $http({
                method: 'POST',
                url: link,
                data: {'taskId': taskId, 'nameSubTasks': nameSubTasks},
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function successCallback(success) {
                var subTaskid = success.data.id;
                for(var i = 0; i < $scope.models.lists[categorieName][0].length;i++ )
                {
                    if($scope.models.lists[categorieName][0][i].id == taskId)
                    {
                        $scope.models.lists[categorieName][0][i].sous_tache[0].push({checked:false, description: nameSubTasks, id: subTaskid, val:33.333333333333336});

                        var countTache = $scope.models.lists[categorieName][0][i].sous_tache[0].length;
                        if(countTache > 0){
                            var result = 100/countTache;
                        }

                        for(var k=0;k<$scope.models.lists[categorieName][0][i].sous_tache[0].length;k++)
                        {
                            $scope.models.lists[categorieName][0][i].sous_tache[0][k].val = result;
                        }
                    }
                }
            }, function errorCallback(error) {
                console.log(error);
            });
        };

        $scope.checkedSubTasks = function(checked,subTaskId,categorieName,taskId)
        {
            //console.log(checked,subTaskId,categorieName,taskId);

            var isChecked;

            if(checked == false)
            {
                isChecked = true;
                //$('.progress-bar').css('width', 30 + '%').attr('aria-valuenow', 20);
            }
            else
            {
                isChecked = false;
                //$('.progress-bar').css('width', 30 + '%').attr('aria-valuenow', 20);
            }

            var link = 'http://localhost:8000/update/checked/subtasks';
            $http({
                method: 'POST',
                url: link,
                data: {'subTaskId': subTaskId, 'isChecked': isChecked},
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function successCallback(success) {
                for(var i = 0; i < $scope.models.lists[categorieName][0].length;i++ )
                {
                    if($scope.models.lists[categorieName][0][i].id == taskId)
                    {
                        for(var k=0;k<$scope.models.lists[categorieName][0][i].sous_tache[0].length;k++)
                        {
                            if($scope.models.lists[categorieName][0][i].sous_tache[0][k].id == subTaskId)
                            {
                                $scope.models.lists[categorieName][0][i].sous_tache[0][k].checked = isChecked;
                            }
                        }
                    }
                }
            }, function errorCallback(error) {
                console.log(error);
            });
        };














    });