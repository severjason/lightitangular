namespace lightItApp {
    "use strict";

    class App {

        public static $inject: string[] = ["$locationProvider"];

        constructor(private $locationProvider: ng.ILocationProvider) {
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix("!");
        }
    }
    angular
        .module("lightItApp",
            [
                "appRouting",
                "appAPI",
                "appHome",
                "appProduct",
                "appSignUp",
                "appLogin",
                "appLogout",
            ])
        .config(App);

}
