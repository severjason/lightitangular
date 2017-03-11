let underscore = angular.module("appUnderscore", []);
underscore.factory("_", ["$window", function ($window) {
        return $window._;
    }]);
