/// <reference path="../../node_modules/@types/angular-route/index.d.ts" />
angular.module("routing", ["ngRoute"]).config(['$routeProvider', '$locationProvider',
    function ($routeProvider: angular.route.IRouteProvider, $locationProvider:ng.ILocationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'js/components/home/homeView.html',
                controller: 'homeController'
            })
            .when('/login',{
                templateUrl: 'js/components/login/loginView.html',
            })
            .when('/signup',{
                templateUrl: 'js/components/signup/signUpView.html',
                controller: 'signUpController'
            })
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }]);