var lightItApp;
(function (lightItApp) {
    "use strict";
    class Routes {
        constructor($routeProvider) {
            $routeProvider
                .when("/", {
                title: "Home page",
                templateUrl: "js/components/home/_homeView.html",
                controller: "HomeController",
            })
                .when("/login", {
                title: "Login",
                templateUrl: "js/components/login/_loginView.html",
                controller: "LoginController",
            })
                .when("/logout", {
                templateUrl: "js/components/login/_loginView.html",
                controller: "LogoutController",
            })
                .when("/signup", {
                title: "Sign up",
                templateUrl: "js/components/signup/_signUpView.html",
                controller: "SignUpController",
            })
                .when("/product/:id", {
                title: "Product info",
                templateUrl: "js/components/product/_productView.html",
                controller: "ProductController",
                resolve: {
                    allProductsData: ["apiService", (apiService) => {
                            return apiService.getProducts()
                                .then((response) => {
                                return response.data;
                            }, () => {
                                return false;
                            });
                        }],
                },
            })
                .otherwise({ redirectTo: "/" });
        }
    }
    Routes.$inject = ["$routeProvider"];
    angular
        .module("appRouting", ["ngRoute", "ngClassified"])
        .constant("$classify", true)
        .config(Routes)
        .run(["$rootScope", "$location", "userService", "apiService", ($rootScope, $location, userService, apiService) => {
            $rootScope.$on("$routeChangeStart", (event, current, prev) => {
                if (current !== undefined) {
                    if (current.hasOwnProperty("$$route")) {
                        $rootScope.title = current.$$route.title;
                    }
                    if (userService.getUserName() && userService.getToken()) {
                        userService.setRootUserInfo(userService.getUserName(), true);
                    }
                    if (userService.userLoggedIn() &&
                        ($location.path() === apiService.loginUrl ||
                            $location.path() === apiService.signUpUrl)) {
                        $location.path("/");
                    }
                }
            });
            $rootScope.$on("$routeChangeSuccess", (event, current, prev) => {
                if (current.hasOwnProperty("$$route")) {
                    $rootScope.title = current.$$route.title;
                }
            });
        }]);
})(lightItApp || (lightItApp = {}));
