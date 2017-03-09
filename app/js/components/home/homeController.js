let homeModule = angular.module("home", []);
homeModule.controller("homeController", ["$scope", "apiService", function ($scope, apiService) {
        apiService.getProducts()
            .then(function (response) {
            $scope.products = response.data;
        }, function (error) {
            $scope.error = {
                status: "Unable to get all product: " + error.message
            };
        });
    }]);
