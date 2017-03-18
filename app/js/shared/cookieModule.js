var lightItApp;
(function (lightItApp) {
    "use strict";
    class AppCookie {
        constructor(ipCookieService) {
            this.ipCookieService = ipCookieService;
            this.cookieUserName = "username";
            this.cookieToken = "token";
            this.ipCookie = ipCookieService;
        }
        ;
        get cookie() {
            return this.ipCookie;
        }
        save(name, token) {
            this.cookie(this.cookieUserName, name);
            this.cookie(this.cookieToken, token);
        }
        ;
        getToken() {
            return (this.cookie(this.cookieToken)) ? this.cookie(this.cookieToken) : "";
        }
        ;
        getUserName() {
            return (this.cookie(this.cookieUserName)) ? this.cookie(this.cookieUserName) : "";
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
