/// <reference path="../../node_modules/@types/angular/index.d.ts" />
let appName = "lightItApp";
let app = angular.module(appName, ["appRouting", "appAPI", "appHome", "appSignUp"]);
app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }]);
