/// <reference path="../reference/_all.ts" />
var lightItApp;
(function (lightItApp) {
    "use strict";
    class API {
        constructor($http, _, userService) {
            this._apiUrl = "http://smktesting.herokuapp.com/";
            this._productsUrl = "api/products/";
            this._signUpUrl = "api/register/";
            this._loginUrl = "api/login/";
            this._http = $http;
            this._underscore = _;
            this._userService = userService;
        }
        get http() {
            return this._http;
        }
        get _() {
            return this._underscore;
        }
        get apiUrl() {
            return this._apiUrl;
        }
        get productsUrl() {
            return this._productsUrl;
        }
        get signUpUrl() {
            return this._signUpUrl;
        }
        get loginUrl() {
            return this._loginUrl;
        }
        get userService() {
            return this._userService;
        }
        getProducts() {
            return this.http.get(this.apiUrl + this.productsUrl);
        }
        signUp(name, password) {
            return this.http.post(this.apiUrl + this.signUpUrl, {
                "username": this._.escape(name),
                "password": password
            });
        }
        login(name, password) {
            return this.http.post(this.apiUrl + this.loginUrl, {
                headers: { 'x-access-token': this.userService.getToken() },
                "username": this._.escape(name),
                "password": password
            });
        }
    }
    API.$inject = ["$http", "_", "userService"];
    API.serviceName = "apiService";
    angular
        .module("appAPI", ["appUnderscore", "appCookie"])
        .factory(API.serviceName, API);
})(lightItApp || (lightItApp = {}));
