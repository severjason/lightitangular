let apiModule = angular.module("api", []);
apiModule.factory("apiService", function ($http) {
    let apiUrl = "http://smktesting.herokuapp.com/";
    let apiRequest = function (method, path) {
        return $http({
            method: method,
            url: apiUrl + path
        });
    };
    return {
        getProducts: function () {
            return apiRequest("GET", "api/products");
        }
    };
});
