let homeModule = angular.module("home", []);
homeModule.controller("homeController", function ($scope, apiService) {
    apiService.getProducts()
        .then(function (response) {
        $scope.products = response.data;
    }, function (error) {
        console.log(error);
    });
});
