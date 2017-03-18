namespace lightItApp {
    "use strict";

    export class CompareToDirective implements ng.IDirective {

        public static $inject: string[] = [];
        public static directiveName: string = "compareTo";
        public static instance(): ng.IDirective {
            return new CompareToDirective();
        }

        public require: string = "ngModel";
        public scope: any = {
            targetModel: "=compareTo",
        };

        public link = (scope: ng.IScope, element: ng.IAugmentedJQuery,
                       attr: ng.IAttributes, ngModel: ng.INgModelController): void => {
            let compare = (): boolean =>  {
                let el1 = element.val();
                let el2 = scope.targetModel;
                return (el2 !== null) ? el1 === el2 : false;
            };

            scope.$watch(compare, (newValue: boolean) => {
                ngModel.$setValidity("errorCompareTo", newValue);
            });
        }
    }
    angular
        .module("appSignUp")
        .directive(CompareToDirective.directiveName, CompareToDirective.instance);
}
