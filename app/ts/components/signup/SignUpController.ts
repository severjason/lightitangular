namespace lightItApp {
    "use strict";

    class SignUpController {

        public static $inject: string[] = ["$scope", "$timeout", "$location", "apiService", "userService"];
        public static controllerName: string = "SignUpController";

        constructor(private $scope: ng.IScope,
                    private $timeout: ng.ITimeoutService,
                    private $location: ng.ILocationService,
                    private apiService: IApi,
                    private userService: ICookie) {

            $scope.signUp = {
                clearErrors: (): void => {
                    $scope.signUp.error = {
                        status: false,
                    };
                },
                reset: (): void => {
                    $scope.newUser = {};
                    $scope.signUpForm.$setPristine();
                    $scope.signUpForm.$setUntouched();
                },
                submit: (newUser: any): void => {
                    apiService.signUp(newUser.name, newUser.password)
                        .then((response: any) => {
                            if (response.data.success) {
                                $timeout(() => {
                                    $location.path("/login");
                                }, 3000);
                                $scope.signUp.success = {
                                    status: true,
                                    username: newUser.name,
                                };
                            } else {
                                $scope.signUp.clearErrors();
                                $scope.signUp.error = {
                                    status: true,
                                    message: response.data.message,
                                };
                                $timeout(() => {
                                    $scope.signUp.clearErrors();
                                }, 2000);
                            }

                        }, (error: Error) => {
                            $scope.signUp.error = {
                                status: true,
                                message: "Unable to sign up: " + error.message,
                            };
                            $scope.signUp.reset();
                            $timeout(() => {
                                $scope.signUp.clearErrors();
                            }, 2000);
                        });
                },
            };
        }
    }
    angular
        .module("appSignUp", ["appCookie", "appAPI"])
        .controller(SignUpController.controllerName, SignUpController);
}
