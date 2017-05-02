namespace lightItApp {
    "use strict";

    class Routes {

        public static $inject: string[] = ["$routeProvider"];

        constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "js/components/home/_homeView.html",
                    controller: "HomeController",
                })
                .when("/login", {
                    templateUrl: "js/components/login/_loginView.html",
                    controller: "LoginController",
                })
                .when("/logout", {
                    templateUrl: "js/components/login/_loginView.html",
                    controller: "LogoutController",
                })
                .when("/signup", {
                    templateUrl: "js/components/signup/_signUpView.html",
                    controller: "SignUpController",
                })
                .when("/product/:id", {
                    templateUrl: "js/components/product/_productView.html",
                    controller: "ProductController",
                    resolve: {
                        allProductsData: ["apiService", (apiService: IApi) => {
                            return apiService.getProducts()
                                .then((response: any): any => {
                                    return response.data;
                                }, (): any => {
                                    return false;
                                });
                        }],
                    },
                })
                .otherwise({redirectTo: "/"});
        }
    }

    angular
        .module("appRouting", ["ngRoute"])
        .config(Routes)
        .run(($rootScope: ng.IRootScopeService,
              $location: ng.ILocationService,
              userService: ICookie,
              apiService: IApi,
        ) => {
            $rootScope.$on("$routeChangeStart", (event, next, current) => {
                if (next !== undefined) {
                    if (userService.getUserName() && userService.getToken()) {
                        console.log(userService.getUserName());
                        userService.setRootUserInfo(userService.getUserName(), true);
                    }
                    if (userService.userLoggedIn() &&
                        ($location.path() === apiService.loginUrl ||
                        $location.path() === apiService.signUpUrl)) {
                        $location.path("/");
                    }
                }
            });
        });
}
