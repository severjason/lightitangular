var lightItApp;
(function (lightItApp) {
    "use strict";
    class LoginController {
        constructor($scope, apiService, userService) {
            this.$scope = $scope;
            this.apiService = apiService;
            this.userService = userService;
            $scope.submit = (user) => {
                apiService.login(user.name, user.password)
                    .then((response) => {
                    console.log(response.data);
                    userService.save(user.name, response.data.token);
                }, (error) => {
                    console.log(error.message);
                });
            };
        }
    }
    LoginController.$inject = ["$scope", "apiService", "userService"];
    LoginController.controllerName = "LoginController";
    angular
        .module("appLogin", ["appCookie"])
        .controller(LoginController.controllerName, LoginController);
})(lightItApp || (lightItApp = {}));
