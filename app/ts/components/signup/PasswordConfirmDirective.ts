signUpModule.directive("compareTo",[function ():any {
    return {
        require: "ngModel",
        scope: {
            targetModel: "=compareTo"
        },
        link : function (scope:ng.IScope, element:ng.IRootElementService, attr:any, ngModel:ng.INgModelController) {

            let compare = function ():boolean {
                let el1 = element.val();
                let el2 = scope.targetModel;
                return (el2 !==null) ? el1 === el2 : false;
            };

            scope.$watch(compare, function (newValue:boolean) {
                ngModel.$setValidity("errorCompareTo", newValue);
            })
        }
    }
}]);