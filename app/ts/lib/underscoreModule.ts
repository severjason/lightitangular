let underscore: ng.IModule = angular.module("underscore",[]);

underscore.factory("_", function ():any {
    return window._;
})