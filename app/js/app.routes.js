/// <reference path="../../node_modules/@types/angular-route/index.d.ts" />
angular.module("routing", ["ngRoute"]).config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'js/components/home/homeView.html',
            controller: 'homeController'
        })
            .when('/login', {
            templateUrl: 'js/components/login/loginView.html',
        })
            .when('/signup', {
            templateUrl: 'js/components/signup/signUpView.html',
        })
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }]);
