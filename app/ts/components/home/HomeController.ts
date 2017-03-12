module lightItApp {
    "use strict";

    class HomeController {

        static $inject: Array<string> = ["$scope", "apiService", "userService"];
        static controllerName:string = "HomeController";

        constructor(private $scope: ng.IScope, private apiService: any, private userService: any) {
            apiService.getProducts()
                .then((response: any): void => {
                    $scope.products = response.data;
                    console.log(userService.getUserName());
                }, (error: Error): void => {
                    $scope.error = {
                        status: "Unable to get all product: " + error.message
                    };
                });
        }
    }

    angular
        .module("appHome", ["appCookie"])
        .controller(HomeController.controllerName, HomeController);
}



