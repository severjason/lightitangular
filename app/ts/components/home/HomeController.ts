namespace lightItApp {
    "use strict";

    class HomeController {

        public static $inject: string[] = ["$scope", "apiService", "userService"];
        public static controllerName: string = "HomeController";

        constructor(private $scope: ng.IScope, private apiService: IApi, private userService: ICookie) {
            apiService.getProducts()
                .then((response: any): void => {
                    $scope.products = response.data;
                    console.log(userService.getToken());
                }, (error: Error): void => {
                    $scope.error = {
                        status: true,
                        message: "Unable to get all products: " + error.message,
                    };
                });
        }
    }

    angular
        .module("appHome", ["appCookie"])
        .controller(HomeController.controllerName, HomeController);
}
