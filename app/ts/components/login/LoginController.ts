module lightItApp {
    "use strict";

    class LoginController {

        static $inject: Array<string> = ["$scope", "apiService", "userService"];
        static controllerName: string = "LoginController";


        constructor(private $scope: ng.IScope, private apiService: AppApiInterface, private userService: AppCookieInterface) {
            $scope.submit = (user: any): void => {
                apiService.login(user.name, user.password)
                    .then((response: any) => {
                        console.log(response.data);
                        userService.save(user.name, response.data.token);
                    }, (error: Error) => {
                        console.log(error.message)
                    })
            }
        }
    }

    angular
        .module("appLogin", ["appCookie"])
        .controller(LoginController.controllerName, LoginController);

}