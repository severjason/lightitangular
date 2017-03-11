signUpModule.directive("compareTo", [function () {
        return {
            require: "ngModel",
            scope: {
                targetModel: "=compareTo"
            },
            link: function (scope, element, attr, ngModel) {
                let compare = function () {
                    let el1 = element.val();
                    let el2 = scope.targetModel;
                    return (el2 !== null) ? el1 === el2 : false;
                };
                scope.$watch(compare, function (newValue) {
                    ngModel.$setValidity("errorCompareTo", newValue);
                });
            }
        };
    }]);
