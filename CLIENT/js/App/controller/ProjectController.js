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
            var count_checked = 0;
            var users_in_tasks = [];
            var users_not_in_tasks = [];

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

                                    for(var y = 0; y <$scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].users_in_tasks_by_tasks.length;y++)
                                    {

                                        if($scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].users_in_tasks_by_tasks[y].users_by_tasks != undefined){
                                            users_in_tasks.push({
                                                id: $scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].users_in_tasks_by_tasks[y].users_by_tasks.id,
                                                username: $scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].users_in_tasks_by_tasks[y].users_by_tasks.username,
                                                picture: $scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].users_in_tasks_by_tasks[y].users_by_tasks.picture
                                            });

                                        }
                                    }
                                    for(var m = 0; m <$scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks.length;m++){
                                        tab_sous_tache.push({
                                            id:$scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks[m].id,
                                            description:$scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks[m].description,
                                            val: result,
                                            checked:$scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks[m].checked
                                        });

                                        if($scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].tasks_by_sub_tasks[m].checked == true)
                                        {
                                            count_checked = count_checked + result;
                                        }
                                    }

                                    count_checked =  Math.floor(count_checked);

                                    $scope.models.lists[key][0].push({
                                        label: $scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].name,
                                        id: $scope.personnelProjects[i].categories_by_projects[j].categories_by_tasks[k].id,
                                        sous_tache:[tab_sous_tache],
                                        count_checked: [count_checked],
                                        users_in_tasks: [users_in_tasks]
                                    });

                                    users_in_tasks = [];
                                    count_checked = 0;
                                    tab_sous_tache = [];
                                }
                            }
                        }
                    }
                }

            });

            $scope.members_project = [];

            for (var i = 0; i < $scope.personnelProjects.length; i++) {
                if ($scope.personnelProjects[i].id == id_params)
                {
                    for(var n=0; n<$scope.personnelProjects[i].users_by_projects.length;n++)
                    {
                        $scope.members_project.push($scope.personnelProjects[i].users_by_projects[n].users_by_projects);
                    }
                }
            }

            for (var i = $scope.members_project.length - 1; i >=0; i--) {

                if ( $scope.members_project[i] === undefined ) {
                    $scope.members_project.splice(i,1);
                }
            }

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
            var resultat = 0;

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
                        $scope.models.lists[categorieName][0][i].sous_tache[0].push({checked:false, description: nameSubTasks, id: subTaskid, val:null});

                        var countTache = $scope.models.lists[categorieName][0][i].sous_tache[0].length;
                        if(countTache > 0){
                            var result = 100/countTache;
                        }

                        for(var k=0;k<$scope.models.lists[categorieName][0][i].sous_tache[0].length;k++)
                        {
                            $scope.models.lists[categorieName][0][i].sous_tache[0][k].val = result;

                            if($scope.models.lists[categorieName][0][i].sous_tache[0][k].checked == true)
                            {
                                resultat = resultat + $scope.models.lists[categorieName][0][i].sous_tache[0][k].val;

                                $('#progressbar'+taskId).css({'width': resultat+'%', 'background': '#337ab7'}).attr('aria-valuenow', 20);
                                $('.count_checked_'+taskId).html(Math.floor(resultat));
                            }
                        }
                    }
                }
            }, function errorCallback(error) {

                console.log(error);
            });
        };

        $scope.checkedSubTasks = function(checked,subTaskId,categorieName,taskId)
        {
            var isChecked;
            var resultat = 0;
            var tabChecked = [];

            if(checked == false)
            {
                isChecked = true;
            }
            else
            {
                isChecked = false;
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

                            if($scope.models.lists[categorieName][0][i].sous_tache[0][k].checked == true)
                            {
                                tabChecked.push($scope.models.lists[categorieName][0][i].sous_tache[0][k].checked);
                                resultat = resultat + $scope.models.lists[categorieName][0][i].sous_tache[0][k].val;

                                if(resultat >= 100)
                                {
                                    $('#progressbar'+taskId).css({'width': resultat+'%', 'background': 'green'}).attr('aria-valuenow', 20);
                                }
                                else
                                {
                                    $('#progressbar'+taskId).css({'width': resultat+'%', 'background': '#337ab7'}).attr('aria-valuenow', 20);
                                }
                            }
                            if(tabChecked.length === 0)
                            {
                                resultat = 0;
                                $('#progressbar'+taskId).css('width', resultat+'%').attr('aria-valuenow', 20);
                            }

                            $('.count_checked_'+taskId).html(Math.floor(resultat));
                        }
                    }
                }
            }, function errorCallback(error) {
                console.log(error);
            });
        };

        $scope.myFunc = function(myValue) {

            if(myValue == undefined){
                $scope.searchUser = '';
                return false;
            }
            var link = 'http://localhost:8000/search/users';
            var data = {username:myValue};
            $http({
                method: 'POST', url: link, data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(success) {
                for(var h = 0;h<success.data.techUser.length;h++ )
                {
                    if(success.data.techUser[h].id == myId)
                    {
                        success.data.techUser.splice(h, 1);
                    }

                    for(var l=0;l<$scope.members_project.length;l++)
                    {
                        if(success.data.techUser[h] != undefined){
                            if($scope.members_project[l].id == success.data.techUser[h].id)
                            {
                                success.data.techUser.splice(h, 1);
                            }
                        }

                    }
                }

                $scope.searchUser = success.data.techUser;
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

        $scope.addUserInProject = function(userId,picture,username)
        {
            var link = 'http://localhost:8000/add/users/inProjects';
            var data = {userId:userId,projectId:id_params};
            $http({
                method: 'POST', url: link, data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(success) {
                console.log(success);
                $timeout(function() {
                    $route.reload();
                }, 0);

            }, function errorCallback(error) {
                console.log('error', error);
            });


        };
        $scope.addInSubTask = function (UserId,taskId) {
             console.log(UserId,taskId);


            var link = 'http://localhost:8000/add/users/inTasks';
            var data = {userId:UserId,taskId:taskId};
            $http({
                method: 'POST', url: link, data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(success) {
                console.log(success);
                $timeout(function() {
                    $route.reload();
                }, 0);

            }, function errorCallback(error) {
                console.log('error', error);
            });

        }

    });

