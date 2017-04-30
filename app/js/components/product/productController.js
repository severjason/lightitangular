var lightItApp;
(function (lightItApp) {
    "use strict";
    class ProductController {
        constructor($scope, $routeParams, apiService, userService, allProductsData) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.apiService = apiService;
            this.userService = userService;
            this.allProductsData = allProductsData;
            apiService.getProductReview($routeParams.id).then((response) => {
                for (let product of allProductsData) {
                    if (product.id.toString() === $routeParams.id) {
                        $scope.product = product;
                    }
                }
                if (response.data) {
                    $scope.reviews = response.data;
                }
            });
        }
    }
    ProductController.$inject = ["$scope", "$routeParams", "apiService", "userService", "allProductsData"];
    ProductController.controllerName = "ProductController";
    angular
        .module("appProduct", ["appCookie", "appAPI"])
        .controller(ProductController.controllerName, ProductController);
})(lightItApp || (lightItApp = {}));
