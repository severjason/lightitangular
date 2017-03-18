namespace lightItApp {
    "use strict";

    class Underscore {

        public static $inject: string[] = ["$window"];
        public static serviceName: string = "_";

        constructor(private $window: any) {
            return $window._;
        }
    }

    angular
        .module("appUnderscore", [])
        .factory(Underscore.serviceName, Underscore);

}
