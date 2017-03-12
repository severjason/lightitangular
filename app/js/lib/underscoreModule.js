var lightItApp;
(function (lightItApp) {
    "use strict";
    class Underscore {
        constructor($window) {
            this.$window = $window;
            return $window._;
        }
    }
    Underscore.$inject = ["$window"];
    Underscore.serviceName = "_";
    angular
        .module("appUnderscore", [])
        .factory(Underscore.serviceName, Underscore);
})(lightItApp || (lightItApp = {}));
