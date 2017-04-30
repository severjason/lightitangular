var lightItApp;
(function (lightItApp) {
    "use strict";
    class App {
        constructor($locationProvider) {
            this.$locationProvider = $locationProvider;
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix("!");
        }
    }
    App.$inject = ["$locationProvider"];
    angular
        .module("lightItApp", ["appRouting", "appAPI", "appHome", "appProduct", "appSignUp", "appLogin", "appLogout"])
        .config(App);
})(lightItApp || (lightItApp = {}));
