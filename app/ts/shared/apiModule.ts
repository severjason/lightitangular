/// <reference path="../../../node_modules/@types/underscore/index.d.ts" />
import UnderscoreStatic = _.UnderscoreStatic;
let apiModule: ng.IModule = angular.module("appAPI", ["appUnderscore"]);

apiModule.factory("apiService", ["$http", "_", function ($http: ng.IHttpService, _:UnderscoreStatic):any {

    let apiUrl: string = "http://smktesting.herokuapp.com/";

    return {
        getProducts: function ():any {
            return $http.get(apiUrl + "api/products/");
        },
        signUp: function (name:string, password:string):any {
            return $http.post(apiUrl + "api/register/", {"username":_.escape(name), "password": password});
        }
    };
}]);