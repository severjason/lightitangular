var lightItApp;
(function (lightItApp) {
    "use strict";
    class SignUpController {
        constructor($scope, apiService, userService) {
            this.$scope = $scope;
            this.apiService = apiService;
            this.userService = userService;
            $scope.submit = (newUser) => {
                apiService.signUp(newUser.name, newUser.password)
                    .then((response) => {
                    console.log(response.data);
                    userService.save(newUser.name, response.data.token);
                }, (error) => {
                    console.log(error.message);
                });
            };
        }
    }
    SignUpController.$inject = ["$scope", "apiService", "userService"];
    SignUpController.controllerName = "SignUpController";
    angular
        .module("appSignUp", ["appCookie"])
        .controller(SignUpController.controllerName, SignUpController);
})(lightItApp || (lightItApp = {}));
