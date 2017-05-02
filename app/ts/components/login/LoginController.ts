namespace lightItApp {
    "use strict";

    class LoginController {

        public static $inject: string[] = ["$scope", "$window", "$timeout", "$location",
            "apiService", "userService"];
        public static controllerName: string = "LoginController";

        constructor(private $scope: ng.IScope,
                    private $window: ng.IWindowService,
                    private $timeout: ng.ITimeoutService,
                    private $location: ng.ILocationService,
                    private apiService: IApi,
                    private userService: ICookie) {

            $scope.login = {
                clearErrors: (): void => {
                    $scope.login.error = {
                        status: false,
                    };
                },
                reset: (): void => {
                    $scope.loginForm.$setPristine();
                    $scope.loginForm.$setUntouched();
                },
                submit: (user: any): void => {
                    apiService.login(user.name, user.password)
                        .then((response: any) => {
                            if (response.data.success) {
                                userService.save(user.name, response.data.token);
                                $window.history.back();
                            } else {
                                $scope.login.error = {
                                    status: true,
                                    message: response.data.message,
                                };
                                $timeout(() => {
                                    $scope.login.clearErrors();
                                }, 2000);
                            }
                        }, (error: Error) => {
                            $scope.login.error = {
                                status: true,
                                message: "Unable to login: " + error.message,
                            };
                            $scope.login.reset();
                            $timeout(() => {
                                $scope.login.clearErrors();
                            }, 2000);
                        });
                },
            };
        }
    }

    angular
        .module("appLogin", ["appCookie", "appAPI"])
        .controller(LoginController.controllerName, LoginController);

}
