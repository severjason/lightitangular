let signUpModule: ng.IModule = angular.module("appSignUp", []);

signUpModule.controller("SignUpController", ["$scope", "apiService", function ($scope: ng.IScope, apiService: any): void {
    $scope.submit = function (newUser: any): void {
        apiService.signUp(newUser.name, newUser.password)
            .then(function (response: string) {
                console.log(response);
            }, function (error: Error) {
                console.log(error.message)
            })
    }
}]);