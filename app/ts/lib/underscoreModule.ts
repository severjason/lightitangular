let underscore: ng.IModule = angular.module("appUnderscore",[]);

underscore.factory("_", ["$window", function ($window:any):any {
    return $window._;
}]);