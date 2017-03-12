/// <reference path="../reference/_all.ts" />
module lightItApp {
    "use strict";
    import UnderscoreStatic = _.UnderscoreStatic;

    export interface AppApiInterface extends ng.IDirective {
        getProducts(): any;
        signUp(name: string, password: string): any;
        login(name: string, password: string): any;
    }

    class API {
        private _apiUrl: string;
        private _productsUrl: string;
        private _signUpUrl: string;
        private _loginUrl: string;
        private _http: ng.IHttpService;
        private _underscore: UnderscoreStatic;
        private _userService: AppCookieInterface;

        static $inject: Array<string> = ["$http", "_", "userService"];
        static serviceName: string = "apiService";

        constructor($http: ng.IHttpService, _: UnderscoreStatic, userService: AppCookieInterface) {
            this._apiUrl = "http://smktesting.herokuapp.com/";
            this._productsUrl = "api/products/";
            this._signUpUrl = "api/register/";
            this._loginUrl = "api/login/";
            this._http = $http;
            this._underscore = _;
            this._userService = userService;
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

        get loginUrl(): string {
            return this._loginUrl;
        }

        get userService():any {
            return this._userService;
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

        login(name: string, password: string): any {
            return this.http.post(this.apiUrl + this.loginUrl, {
                headers: {'x-access-token': this.userService.getToken()},
                "username": this._.escape(name),
                "password": password
            });
        }
    }
    angular
        .module("appAPI", ["appUnderscore", "appCookie"])
        .factory(API.serviceName, API);
}
