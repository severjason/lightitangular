var lightItApp;
(function (lightItApp) {
    "use strict";
    class CompareToDirective {
        constructor() {
            this.require = "ngModel";
            this.scope = {
                targetModel: "=compareTo",
            };
            this.link = (scope, element, attr, ngModel) => {
                let compare = () => {
                    let el1 = element.val();
                    let el2 = scope.targetModel;
                    return (el2 !== null) ? el1 === el2 : false;
                };
                scope.$watch(compare, (newValue) => {
                    ngModel.$setValidity("errorCompareTo", newValue);
                });
            };
        }
        static instance() {
            return new CompareToDirective();
        }
    }
    CompareToDirective.$inject = [];
    CompareToDirective.directiveName = "compareTo";
    lightItApp.CompareToDirective = CompareToDirective;
    angular
        .module("appSignUp")
        .directive(CompareToDirective.directiveName, CompareToDirective.instance);
})(lightItApp || (lightItApp = {}));
