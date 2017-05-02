namespace lightItApp {
    "use strict";

    class ProductController {

        public static $inject: string[] = ["$scope", "$routeParams", "apiService", "userService", "allProductsData"];
        public static controllerName: string = "ProductController";

        constructor(
            private $scope: ng.IScope,
            private $routeParams: ng.route.IRouteParamsService,
            private apiService: IApi,
            private userService: ICookie,
            private allProductsData: any) {

            apiService.getProductReview($routeParams.id).then((response: any) => {
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

    angular
        .module("appProduct", ["appCookie", "appAPI"])
        .controller(ProductController.controllerName, ProductController);
}
