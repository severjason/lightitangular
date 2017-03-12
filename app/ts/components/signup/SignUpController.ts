module lightItApp {
    "use strict";

    class SignUpController {

        static $inject: Array<string> = ["$scope", "apiService", "userService"];
        static controllerName:string = "SignUpController";

        constructor(private $scope: ng.IScope, private apiService: any, private userService:any) {
            $scope.submit = (newUser: any): void => {
                apiService.signUp(newUser.name, newUser.password)
                    .then((response: any) => {
                        console.log(response.data);
                        userService.save(newUser.name, response.data.token);
                    }, (error: Error) => {
                        console.log(error.message)
                    })
            }
        }
    }
    angular
        .module("appSignUp", ["appCookie"])
        .controller(SignUpController.controllerName, SignUpController);
}
