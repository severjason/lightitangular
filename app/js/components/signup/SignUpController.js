let signUpModule = angular.module("appSignUp", []);
signUpModule.controller("SignUpController", ["$scope", "apiService", function ($scope, apiService) {
        $scope.submit = function (newUser) {
            apiService.signUp(newUser.name, newUser.password)
                .then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error.message);
            });
        };
    }]);
