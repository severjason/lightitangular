/// <reference path="reference/_all.ts" />
module lightItApp {
    "use strict";

    class App {

        static $inject: Array<string> = ['$locationProvider'];

        constructor(private $locationProvider: ng.ILocationProvider) {
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
        }
    }
    angular
        .module("lightItApp", ["appRouting", "appAPI", "appHome", "appSignUp"])
        .config(App);

}

