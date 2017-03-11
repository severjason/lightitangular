let apiModule = angular.module("appAPI", ["appUnderscore"]);
apiModule.factory("apiService", ["$http", "_", function ($http, _) {
        let apiUrl = "http://smktesting.herokuapp.com/";
        return {
            getProducts: function () {
                return $http.get(apiUrl + "api/products/");
            },
            signUp: function (name, password) {
                return $http.post(apiUrl + "api/register/", { "username": _.escape(name), "password": password });
            }
        };
    }]);
