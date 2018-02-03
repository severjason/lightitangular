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

            this.getReviews($routeParams.id, this.products, $scope);

            $scope.newReview = {
                clearErrors: (): void => {
                    $scope.newReview.error = {
                        status: false,
                    };
                },
                submit: (review: any): void => {
                    if (this.us.userLoggedIn()) {
                        this.api.postReview(this.routeParams.id, review).then((response: any) => {
                            this.getReviews(this.routeParams.id, this.products, $scope);
                            $scope.review.text = "";
                        });
                    } else {
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

        private get us(): ICookie {
            return this.userService;
        }

        private get products(): any {
            return this.allProductsData;
        }

        private get api(): IApi {
            return this.apiService;
        }

        private get routeParams(): ng.route.IRouteParamsService {
            return this.$routeParams;
        }

        private getReviews(id: string, products: any, $scope: ng.IScope): void {
            return  this.api.getProductReview(id)
                .then((response: any) => {
                    for (const product of products) {
                        if (product.id.toString() === id) {
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
        }
    }

    angular
        .module("appProduct", ["appCookie", "appAPI"])
        .controller(ProductController.controllerName, ProductController);
}
