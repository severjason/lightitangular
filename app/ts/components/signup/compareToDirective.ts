/// <reference path="../../reference/_all.ts" />
module lightItApp {
    "use strict";

    export class compareToDirective implements ng.IDirective {
        public require: string = "ngModel";
        public scope: any = {
            targetModel: "=compareTo"
        };

        static $inject: Array<string> = [];
        static directiveName:string = "compareTo";

        constructor() {
        }

        static instance(): ng.IDirective {
            return new compareToDirective();
        }

        public link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attr: ng.IAttributes, ngModel: ng.INgModelController): void => {
            let compare = function (): boolean {
                let el1 = element.val();
                let el2 = scope.targetModel;
                return (el2 !== null) ? el1 === el2 : false;
            };

            scope.$watch(compare, function (newValue: boolean) {
                ngModel.$setValidity("errorCompareTo", newValue);
            });
        };

    }

    angular
        .module("appSignUp")
        .directive(compareToDirective.directiveName, compareToDirective.instance);
}
