var lightItApp;
(function (lightItApp) {
    "use strict";
    class HomeController {
        constructor($scope, apiService, userService) {
            this.$scope = $scope;
            this.apiService = apiService;
            this.userService = userService;
            apiService.getProducts()
                .then((response) => {
                $scope.products = response.data;
                console.log(userService.getToken());
            }, (error) => {
                $scope.error = {
                    status: true,
                    message: "Unable to get all products: " + error.message,
                };
            });
        }
    }
    HomeController.$inject = ["$scope", "apiService", "userService"];
    HomeController.controllerName = "HomeController";
    angular
        .module("appHome", ["appCookie"])
        .controller(HomeController.controllerName, HomeController);
})(lightItApp || (lightItApp = {}));
