var lightItApp;
(function (lightItApp) {
    "use strict";
    class LoginController {
        constructor($scope, $timeout, $location, apiService, userService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$location = $location;
            this.apiService = apiService;
            this.userService = userService;
            $scope.login = {
                clearErrors: () => {
                    $scope.login.error = {
                        status: false,
                    };
                },
                reset: () => {
                    $scope.loginForm.$setPristine();
                    $scope.loginForm.$setUntouched();
                },
                submit: (user) => {
                    apiService.login(user.name, user.password)
                        .then((response) => {
                        if (response.data.success) {
                            userService.save(user.name, response.data.token, user.rememberMe);
                            $location.path("/");
                        }
                        else {
                            $scope.login.error = {
                                status: true,
                                message: response.data.message,
                            };
                            $timeout(() => {
                                $scope.login.clearErrors();
                            }, 2000);
                        }
                    }, (error) => {
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
    LoginController.$inject = ["$scope", "$timeout", "$location", "apiService", "userService"];
    LoginController.controllerName = "LoginController";
    angular
        .module("appLogin", ["appCookie", "appAPI"])
        .controller(LoginController.controllerName, LoginController);
})(lightItApp || (lightItApp = {}));
