let homeModule:ng.IModule = angular.module("home",[]);

homeModule.controller("homeController", ["$scope", "apiService", function ($scope: ng.IScope, apiService:any):void {
    apiService.getProducts()
        .then(function (response:any):void {
            $scope.products = response.data;
        }, function (error:any):void {
            $scope.error = {
                status: "Unable to get all product: " + error.message
            };
        })
}]);