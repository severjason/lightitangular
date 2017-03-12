/// <reference path="../../reference/_all.ts" />
var lightItApp;
(function (lightItApp) {
    "use strict";
    class compareToDirective {
        constructor() {
            this.require = "ngModel";
            this.scope = {
                targetModel: "=compareTo"
            };
            this.link = (scope, element, attr, ngModel) => {
                let compare = function () {
                    let el1 = element.val();
                    let el2 = scope.targetModel;
                    return (el2 !== null) ? el1 === el2 : false;
                };
                scope.$watch(compare, function (newValue) {
                    ngModel.$setValidity("errorCompareTo", newValue);
                });
            };
        }
        static instance() {
            return new compareToDirective();
        }
    }
    compareToDirective.$inject = [];
    compareToDirective.directiveName = "compareTo";
    lightItApp.compareToDirective = compareToDirective;
    angular
        .module("appSignUp")
        .directive(compareToDirective.directiveName, compareToDirective.instance);
})(lightItApp || (lightItApp = {}));
