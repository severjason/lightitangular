let homeModule = angular.module("home",[]);

homeModule.controller("homeController", function ($scope: ng.IScope, apiService:any) {
    apiService.getProducts()
        .then(function (response:any) {
            $scope.products = response.data;
        }, function (error:string) {
            console.log(error);
        })
});