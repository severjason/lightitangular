module lightItApp {
    "use strict";

    class Underscore {

        static $inject: Array<string> = ["$window"];
        static serviceName: string = "_";

        constructor(private $window: any) {
            return $window._;
        }
    }

    angular
        .module("appUnderscore", [])
        .factory(Underscore.serviceName, Underscore);

}
