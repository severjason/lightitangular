var lightItApp;
(function (lightItApp) {
    "use strict";
    class RouteChangeController {
        constructor($rootScope) {
            this.$rootScope = $rootScope;
            console.log(1111);
            $rootScope.$on("$routeChangeStart", (event, next, prev) => {
                console.log(next);
            });
        }
    }
    RouteChangeController.$inject = ["$rootScope"];
    RouteChangeController.controllerName = "RouteChangeController";
    angular
        .module("appRouteChange", [])
        .controller(RouteChangeController.controllerName, RouteChangeController);
})(lightItApp || (lightItApp = {}));
