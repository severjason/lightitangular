/// <reference path="reference/_all.ts" />
module lightItApp {
    "use strict";

    class Routes {

        static $inject: Array<string> = ['$routeProvider'];

        constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'js/components/home/_homeView.html',
                    controller: 'HomeController'
                })
                .when('/login', {
                    templateUrl: 'js/components/login/_loginView.html',
                })
                .when('/signup', {
                    templateUrl: 'js/components/signup/_signUpView.html',
                    controller: 'SignUpController'
                })
                .otherwise({redirectTo: '/'});
        }
    }

    angular
        .module("appRouting", ["ngRoute"])
        .config(Routes);
}



