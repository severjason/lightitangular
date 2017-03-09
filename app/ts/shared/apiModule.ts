let apiModule: ng.IModule = angular.module("api", ["underscore"]);

apiModule.factory("apiService", ["$http", "_", function ($http: ng.IHttpService, _:underscore):any {

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