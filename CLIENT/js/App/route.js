angular.module('myApp', ['ngRoute', 'naif.base64', 'ngSanitize', 'ngCookies','dndLists'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                url: "/",
                templateUrl: 'templates/login.html',
                controller: 'login'
            })
            .when('/register', {
              url: "/register",
              templateUrl: 'templates/register.html',
              controller: 'register'
            })
            .when('/dashboard', {
              url: "/dashboard",
              templateUrl: 'templates/dashboard.html',
              controller: 'dashboard'
            })
            .when('/test', {
              url: "/test",
              templateUrl: 'templates/test.html',
              controller: 'test'
            })
            .when('/profil', {
              url: "/profil",
              templateUrl: 'templates/profil.html',
              controller: 'profil'
            })
            .when('/projects/:id/:name', {
                templateUrl: 'templates/project.html',
                controller: 'project'
            })
            .when('/share/:id/:name', {
                templateUrl: 'templates/share.html',
                controller: 'share'
            })
            .when('/verification/:userId/:privateKey', {
                templateUrl: 'templates/verification.html',
                controller: 'verification'
            })
            .otherwise({redirectTo: '/'});
    });