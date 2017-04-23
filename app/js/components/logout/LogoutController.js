var lightItApp;
(function (lightItApp) {
    "use strict";
    class LogoutController {
        constructor($location, apiService, userService) {
            this.$location = $location;
            this.apiService = apiService;
            this.userService = userService;
            userService.clearAll();
            $location.path("/");
        }
    }
    LogoutController.$inject = ["$location", "apiService", "userService"];
    LogoutController.controllerName = "LogoutController";
    angular
        .module("appLogout", ["appCookie", "appAPI"])
        .controller(LogoutController.controllerName, LogoutController);
})(lightItApp || (lightItApp = {}));
