namespace lightItApp {
    "use strict";

    class Routes {

        public static $inject: string[] = ["$routeProvider"];

        constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "js/components/home/_homeView.html",
                    controller: "HomeController",
                })
                .when("/login", {
                    templateUrl: "js/components/login/_loginView.html",
                    controller: "LoginController",
                })
                .when("/signup", {
                    templateUrl: "js/components/signup/_signUpView.html",
                    controller: "SignUpController",
                })
                .otherwise({redirectTo: "/"});
        }
    }

    angular
        .module("appRouting", ["ngRoute"])
        .config(Routes);
}
