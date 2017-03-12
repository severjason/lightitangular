/// <reference path="../reference/_all.ts" />
var lightItApp;
(function (lightItApp) {
    "use strict";
    class AppCookie {
        constructor(ipCookie) {
            this.ipCookie = ipCookie;
            this.cookieUserName = "username";
            this.cookieToken = "token";
            this._cookie = ipCookie;
        }
        ;
        get cookie() {
            return this._cookie;
        }
        save(name, token) {
            this.cookie(this.cookieUserName, name);
            this.cookie(this.cookieToken, token);
        }
        ;
        getToken() {
            return (this.cookie(this.cookieToken)) ? this.cookie(this.cookieToken) : false;
        }
        ;
        getUserName() {
            return (this.cookie(this.cookieUserName)) ? this.cookie(this.cookieUserName) : false;
        }
        ;
        remove() {
            this.cookie.remove(this.cookieUserName);
            this.cookie.remove(this.cookieToken);
        }
        ;
    }
    AppCookie.$inject = ["ipCookie"];
    AppCookie.serviceName = "userService";
    angular
        .module("appCookie", ["ipCookie"])
        .factory(AppCookie.serviceName, AppCookie);
})(lightItApp || (lightItApp = {}));
