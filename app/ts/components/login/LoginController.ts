namespace lightItApp {
    "use strict";

    class LoginController {

        public static $inject: string[] = ["$scope", "apiService", "userService"];
        public static controllerName: string = "LoginController";

        constructor(private $scope: ng.IScope,
                    private apiService: IApi,
                    private userService: ICookie) {
            $scope.submit = (user: any): void => {
                apiService.login(user.name, user.password)
                    .then((response: any) => {
                        console.log(response.data);
                        userService.save(user.name, response.data.token);
                    }, (error: Error) => {
                        console.log(error.message);
                    });
            };
        }
    }

    angular
        .module("appLogin", ["appCookie"])
        .controller(LoginController.controllerName, LoginController);

}
