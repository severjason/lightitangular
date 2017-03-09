let apiModule: ng.IModule = angular.module("api", []);

apiModule.factory("apiService", function ($http: ng.IHttpService) {

    let apiUrl: string = "http://smktesting.herokuapp.com/";

    let apiRequest: any = function (method: string, path: string) {
        return $http({
            method: method,
            url: apiUrl + path
        });
    };

    return {
        getProducts: function () {
            return apiRequest("GET", "api/products");
        }
    }
});