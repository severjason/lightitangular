/// <reference path="../reference/_all.ts" />
module lightItApp {
    "use strict";
    import UnderscoreStatic = _.UnderscoreStatic;

    class API {
        private _apiUrl: string;
        private _productsUrl: string;
        private _signUpUrl: string;
        private _http: ng.IHttpService;
        private _underscore: UnderscoreStatic;

        static $inject: Array<string> = ["$http", "_"];
        static serviceName: string = "apiService";

        constructor($http: ng.IHttpService, _: UnderscoreStatic) {
            this._apiUrl = "http://smktesting.herokuapp.com/";
            this._productsUrl = "api/products/";
            this._signUpUrl = "api/register/";
            this._http = $http;
            this._underscore = _;
        }

        get http(): ng.IHttpService {
            return this._http;
        }

        get _(): UnderscoreStatic {
            return this._underscore;
        }

        get apiUrl(): string {
            return this._apiUrl;
        }

        get productsUrl(): string {
            return this._productsUrl;
        }

        get signUpUrl(): string {
            return this._signUpUrl;
        }

        getProducts(): any {
            return this.http.get(this.apiUrl + this.productsUrl);
        }

        signUp(name: string, password: string): any {
            return this.http.post(this.apiUrl + this.signUpUrl, {
                "username": this._.escape(name),
                "password": password
            });
        }
    }
    angular
        .module("appAPI", ["appUnderscore"])
        .factory(API.serviceName, API);
}
