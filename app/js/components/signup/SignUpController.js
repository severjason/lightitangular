var lightItApp;
(function (lightItApp) {
    "use strict";
    class SignUpController {
        constructor($scope, $timeout, $location, apiService, userService) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$location = $location;
            this.apiService = apiService;
            this.userService = userService;
            $scope.signUp = {
                clearErrors: () => {
                    $scope.signUp.error = {
                        status: false,
                    };
                },
                reset: () => {
                    $scope.newUser = {};
                    $scope.sign_up_form.$setPristine();
                    $scope.sign_up_form.$setUntouched();
                },
                submit: (newUser) => {
                    $scope.signUp.clearErrors();
                    apiService.signUp(newUser.name, newUser.password)
                        .then((response) => {
                        if (response.data.success) {
                            $timeout(() => {
                                $location.path("/login");
                            }, 3000);
                            $scope.signUp.success = {
                                status: true,
                                username: newUser.name,
                            };
                        }
                        else {
                            $scope.signUp.error = {
                                status: true,
                                message: response.data.message,
                            };
                            $timeout(() => {
                                $scope.signUp.clearErrors();
                            }, 2000);
                        }
                    }, (error) => {
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
    SignUpController.$inject = ["$scope", "$timeout", "$location", "apiService", "userService"];
    SignUpController.controllerName = "SignUpController";
    angular
        .module("appSignUp", ["appCookie"])
        .controller(SignUpController.controllerName, SignUpController);
})(lightItApp || (lightItApp = {}));
