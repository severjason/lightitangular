var lightItApp;
(function (lightItApp) {
    "use strict";
    class ProductController {
        constructor($scope, $routeParams, $timeout, apiService, userService, allProductsData) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.$timeout = $timeout;
            this.apiService = apiService;
            this.userService = userService;
            this.allProductsData = allProductsData;
            apiService.getProductReview($routeParams.id)
                .then((response) => {
                for (let product of allProductsData) {
                    if (product.id.toString() === $routeParams.id) {
                        $scope.product = product;
                    }
                }
                if (response.data) {
                    $scope.reviews = response.data;
                }
            }, (error) => {
                $scope.error = {
                    status: true,
                    message: "Unable to get product info: " + error.message,
                };
            });
            $scope.newReview = {
                clearErrors: () => {
                    $scope.newReview.error = {
                        status: false,
                    };
                },
                submit: (review) => {
                    if (userService.userLoggedIn()) {
                        apiService.postReview($routeParams.id, review).then((response) => {
                            console.log(response);
                        });
                    }
                    else {
                        $scope.newReview.error = {
                            status: true,
                            message: "You should login first",
                        };
                        $timeout(() => {
                            $scope.newReview.clearErrors();
                        }, 2000);
                    }
                },
            };
        }
    }
    ProductController.$inject = ["$scope", "$routeParams", "$timeout",
        "apiService", "userService", "allProductsData"];
    ProductController.controllerName = "ProductController";
    angular
        .module("appProduct", ["appCookie", "appAPI"])
        .controller(ProductController.controllerName, ProductController);
})(lightItApp || (lightItApp = {}));
