/// <reference path="../reference/_all.ts" />
module lightItApp {
    "use strict";

    export interface AppCookieInterface extends ng.IDirective {
        save(name?: string, token?: string): void;
        getToken(): string | boolean
        getUserName(): string | boolean;
        remove(): void;
    }

    class AppCookie implements AppCookieInterface {

        public cookieUserName: string;
        public cookieToken: string;
        private _cookie: angular.cookie.CookieService;

        static $inject: Array<string> = ["ipCookie"];
        static serviceName: string = "userService";

        constructor(private ipCookie: angular.cookie.CookieService) {
            this.cookieUserName = "username";
            this.cookieToken = "token";
            this._cookie = ipCookie;
        };

        get cookie(): angular.cookie.CookieService {
            return this._cookie;
        }

        save(name: string, token: string): void {
            this.cookie(this.cookieUserName, name);
            this.cookie(this.cookieToken, token);
        };

        getToken(): string | boolean {
            return (this.cookie(this.cookieToken)) ? this.cookie(this.cookieToken) : "";
        };

        getUserName(): string|boolean {
            return (this.cookie(this.cookieUserName)) ? this.cookie(this.cookieUserName) : "";
        };

        remove(): void {
            this.cookie.remove(this.cookieUserName);
            this.cookie.remove(this.cookieToken);
        };

    }

    angular
        .module("appCookie", ["ipCookie"])
        .factory(AppCookie.serviceName, AppCookie);
}


