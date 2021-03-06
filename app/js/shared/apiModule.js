var lightItApp;
(function (lightItApp) {
    "use strict";
    class API {
        constructor($http, _, userService) {
            this.apiUrlStr = "http://smktesting.herokuapp.com/api";
            this.productsUrlStr = "/products";
            this.productReviewUrlStr = "/reviews";
            this.signUpUrlStr = "/signup";
            // server API use '/register' but front-end part - '/signup'
            this.registerUrlStr = "/register";
            this.loginUrlStr = "/login";
            this.httpService = $http;
            this.underscore = _;
            this.userCookieService = userService;
        }
        get http() {
            return this.httpService;
        }
        get _() {
            return this.underscore;
        }
        get apiUrl() {
            return this.apiUrlStr;
        }
        get productsUrl() {
            return this.productsUrlStr;
        }
        get productReviewUrl() {
            return this.productReviewUrlStr;
        }
        get signUpUrl() {
            return this.signUpUrlStr;
        }
        get registerUrl() {
            return this.registerUrlStr;
        }
        get loginUrl() {
            return this.loginUrlStr;
        }
        get userService() {
            return this.userCookieService;
        }
        getProducts() {
            return this.http.get(this.apiUrl + this.productsUrl + "/");
        }
        getProductReview(productId) {
            return this.http.get(this.apiUrl + this.productReviewUrl + `/${productId}`);
        }
        signUp(signUpName, signUpPassword) {
            return this.http.post(this.apiUrl + this.registerUrl + "/", {
                username: this._.escape(signUpName),
                password: signUpPassword,
            });
        }
        login(loginName, loginPassword) {
            return this.http.post(this.apiUrl + this.loginUrl + "/", {
                username: this._.escape(loginName),
                password: loginPassword,
            });
        }
        postReview(productId, review) {
            return this.http({
                method: "POST",
                url: this.apiUrl + this.productReviewUrl + `/${productId}`,
                headers: this.userService.setHeaders(),
                data: {
                    rate: review.rate,
                    text: this._.escape(review.text),
                },
            });
        }
    }
    API.$inject = ["$http", "_", "userService"];
    API.serviceName = "apiService";
    angular
        .module("appAPI", ["appUnderscore", "appCookie"])
        .factory(API.serviceName, API);
})(lightItApp || (lightItApp = {}));
