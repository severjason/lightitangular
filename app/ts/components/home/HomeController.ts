let homeModule:ng.IModule = angular.module("appHome",[]);

homeModule.controller("HomeController", ["$scope", "apiService", function ($scope: ng.IScope, apiService:any):void {
    apiService.getProducts()
        .then(function (response:any):void {
            $scope.products = response.data;
        }, function (error:Error):void {
            $scope.error = {
                status: "Unable to get all product: " + error.message
            };
        })
}]);