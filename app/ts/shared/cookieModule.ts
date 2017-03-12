/// <reference path="../reference/_all.ts" />
module lightItApp {
    "use strict";

    class AppCookie {

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

        get cookie():angular.cookie.CookieService {
            return this._cookie;
        }

        private save(name: string, token: string): void {
            this.cookie(this.cookieUserName, name);
            this.cookie(this.cookieToken, token);
        };

        private getToken(): string | boolean {
            return (this.cookie(this.cookieToken)) ? this.cookie(this.cookieToken) : false;
        };

        private getUserName(): string|boolean {
            return (this.cookie(this.cookieUserName)) ? this.cookie(this.cookieUserName) : false;
        };

        private remove(): void {
            this.cookie.remove(this.cookieUserName);
            this.cookie.remove(this.cookieToken);
        };

    }

    angular
        .module("appCookie", ["ipCookie"])
        .factory(AppCookie.serviceName, AppCookie);
}


