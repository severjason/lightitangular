var lightItApp;
(function (lightItApp) {
    "use strict";
    class AppCookie {
        constructor(ipCookieService, $rootScope) {
            this.ipCookieService = ipCookieService;
            this.$rootScope = $rootScope;
            this.cookieUserName = "username";
            this.cookieToken = "token";
            this.cookieRememberUser = "rememberUser";
            this.ipCookie = ipCookieService;
            this.rootScope = $rootScope;
        }
        get cookie() {
            return this.ipCookie;
        }
        setRootUserInfo(name, loggedInValue) {
            this.rootScope.userInfo = {
                name: `${name}`,
                loggedIn: loggedInValue,
            };
        }
        save(name, token) {
            this.cookie(this.cookieUserName, name);
            this.cookie(this.cookieToken, token);
            this.setRootUserInfo(name, true);
        }
        getToken() {
            return (this.cookie(this.cookieToken)) ? this.cookie(this.cookieToken) : "";
        }
        getUserName() {
            return (this.cookie(this.cookieUserName)) ? this.cookie(this.cookieUserName) : "";
        }
        userLoggedIn() {
            return (this.rootScope.userInfo) ? this.rootScope.userInfo.loggedIn : false;
        }
        clearAll() {
            this.cookie.remove(this.cookieUserName);
            this.cookie.remove(this.cookieToken);
            this.setRootUserInfo("", false);
        }
    }
    AppCookie.$inject = ["ipCookie", "$rootScope"];
    AppCookie.serviceName = "userService";
    angular
        .module("appCookie", ["ipCookie"])
        .factory(AppCookie.serviceName, AppCookie);
})(lightItApp || (lightItApp = {}));
