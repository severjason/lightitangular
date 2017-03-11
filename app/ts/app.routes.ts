/// <reference path="../../node_modules/@types/angular-route/index.d.ts" />
let appRouting = angular.module("appRouting", ["ngRoute"]);

appRouting.config(['$routeProvider', function ($routeProvider: angular.route.IRouteProvider):void {
        $routeProvider
            .when('/', {
                templateUrl: 'js/components/home/_homeView.html',
                controller: 'HomeController'
            })
            .when('/login',{
                templateUrl: 'js/components/login/_loginView.html',
            })
            .when('/signup',{
                templateUrl: 'js/components/signup/_signUpView.html',
                controller: 'SignUpController'
            })
            .otherwise({ redirectTo: '/' });
    }]);