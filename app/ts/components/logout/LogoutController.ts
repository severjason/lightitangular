namespace lightItApp {
    "use strict";

    class LogoutController {

        public static $inject: string[] = ["$location", "apiService", "userService"];
        public static controllerName: string = "LogoutController";

        constructor(private $location: ng.ILocationService, private apiService: IApi, private userService: ICookie) {
            userService.clearAll();
            $location.path("/");
        }
    }

    angular
        .module("appLogout", ["appCookie", "appAPI"])
        .controller(LogoutController.controllerName, LogoutController);
}
