var lightItApp;
(function (lightItApp) {
    "use strict";
    class Routes {
        constructor($routeProvider) {
            $routeProvider
                .when("/", {
                templateUrl: "js/components/home/_homeView.html",
                controller: "HomeController",
            })
                .when("/login", {
                templateUrl: "js/components/login/_loginView.html",
                controller: "LoginController",
            })
                .when("/logout", {
                templateUrl: "js/components/login/_loginView.html",
                controller: "LogoutController",
            })
                .when("/signup", {
                templateUrl: "js/components/signup/_signUpView.html",
                controller: "SignUpController",
            })
                .otherwise({ redirectTo: "/" });
        }
    }
    Routes.$inject = ["$routeProvider"];
    angular
        .module("appRouting", ["ngRoute"])
        .config(Routes);
})(lightItApp || (lightItApp = {}));
