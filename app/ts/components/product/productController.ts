namespace lightItApp {
    "use strict";

    class ProductController {

        public static $inject: string[] = ["$scope", "$routeParams", "$timeout",
            "apiService", "userService", "allProductsData"];
        public static controllerName: string = "ProductController";

        constructor(private $scope: ng.IScope,
                    private $routeParams: ng.route.IRouteParamsService,
                    private $timeout: ng.ITimeoutService,
                    private apiService: IApi,
                    private userService: ICookie,
                    private allProductsData: any) {

            apiService.getProductReview($routeParams.id)
                .then((response: any) => {
                    for (let product of allProductsData) {
                        if (product.id.toString() === $routeParams.id) {
                            $scope.product = product;
                        }
                    }
                    if (response.data) {
                        $scope.reviews = response.data;
                    }
                }, (error: Error): void => {
                    $scope.error = {
                        status: true,
                        message: "Unable to get product info: " + error.message,
                    };
                });

            $scope.newReview = {
                clearErrors: (): void => {
                    $scope.newReview.error = {
                        status: false,
                    };
                },
                submit: (review: any) => {
                    if (userService.userLoggedIn()) {
                        apiService.postReview($routeParams.id, review).then((response: any) => {
                            console.log(response);
                        });
                    } else {
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

    angular
        .module("appProduct", ["appCookie", "appAPI"])
        .controller(ProductController.controllerName, ProductController);
}
