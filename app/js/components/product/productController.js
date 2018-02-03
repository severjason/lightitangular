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
            this.getReviews($routeParams.id, this.products, $scope);
            $scope.newReview = {
                clearErrors: () => {
                    $scope.newReview.error = {
                        status: false,
                    };
                },
                submit: (review) => {
                    if (this.us.userLoggedIn()) {
                        this.api.postReview(this.routeParams.id, review).then((response) => {
                            this.getReviews(this.routeParams.id, this.products, $scope);
                            $scope.review.text = "";
                        });
                    }
                    else {
                        $scope.newReview.error = {
                            status: true,
                            message: "You should login first",
                        };
                        this.$timeout(() => {
                            $scope.newReview.clearErrors();
                        }, 2000);
                    }
                },
            };
        }
        get us() {
            return this.userService;
        }
        get products() {
            return this.allProductsData;
        }
        get api() {
            return this.apiService;
        }
        get routeParams() {
            return this.$routeParams;
        }
        getReviews(id, products, $scope) {
            return this.api.getProductReview(id)
                .then((response) => {
                for (const product of products) {
                    if (product.id.toString() === id) {
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
        }
    }
    ProductController.$inject = ["$scope", "$routeParams", "$timeout",
        "apiService", "userService", "allProductsData"];
    ProductController.controllerName = "ProductController";
    angular
        .module("appProduct", ["appCookie", "appAPI"])
        .controller(ProductController.controllerName, ProductController);
})(lightItApp || (lightItApp = {}));
