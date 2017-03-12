/// <reference path="../reference/_all.ts" />
var lightItApp;
(function (lightItApp) {
    "use strict";
    class API {
        constructor($http, _) {
            this._apiUrl = "http://smktesting.herokuapp.com/";
            this._productsUrl = "api/products/";
            this._signUpUrl = "api/register/";
            this._http = $http;
            this._underscore = _;
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
        getProducts() {
            return this.http.get(this.apiUrl + this.productsUrl);
        }
        signUp(name, password) {
            return this.http.post(this.apiUrl + this.signUpUrl, {
                "username": this._.escape(name),
                "password": password
            });
        }
    }
    API.$inject = ["$http", "_"];
    API.serviceName = "apiService";
    angular
        .module("appAPI", ["appUnderscore"])
        .factory(API.serviceName, API);
})(lightItApp || (lightItApp = {}));
