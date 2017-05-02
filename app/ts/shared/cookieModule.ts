namespace lightItApp {
    "use strict";

    export interface ICookie extends ng.IDirective {
        save(name: string, token: string): void;
        getToken(): string | boolean;
        setRootUserInfo(name: string, loggedInValue: boolean): void;
        getUserName(): string;
        userLoggedIn(): boolean;
        clearAll(): void;
    }

    class AppCookie implements ICookie {

        public static $inject: string[] = ["ipCookie", "$rootScope"];
        public static serviceName: string = "userService";

        public cookieUserName: string;
        public cookieToken: string;
        public cookieRememberUser: string;
        private ipCookie: angular.cookie.CookieService;
        private rootScope: ng.IRootScopeService;

        constructor(private ipCookieService: angular.cookie.CookieService, private  $rootScope: ng.IRootScopeService) {
            this.cookieUserName = "username";
            this.cookieToken = "token";
            this.cookieRememberUser = "rememberUser";
            this.ipCookie = ipCookieService;
            this.rootScope = $rootScope;
        };

        get cookie(): angular.cookie.CookieService {
            return this.ipCookie;
        }

        public setRootUserInfo(name: string, loggedInValue: boolean): void {
            this.rootScope.userInfo = {
                name: `${name}`,
                loggedIn: loggedInValue,
            };
        }

        public save(name: string, token: string): void {
            this.cookie(this.cookieUserName, name);
            this.cookie(this.cookieToken, token);
            this.setRootUserInfo(name, true);
        };

        public getToken(): string | boolean {
            return (this.cookie(this.cookieToken)) ? this.cookie(this.cookieToken) : "";
        };

        public getUserName(): string {
            return (this.cookie(this.cookieUserName)) ? this.cookie(this.cookieUserName) : "";
        };

        public userLoggedIn(): boolean {
            return (this.rootScope.userInfo) ? this.rootScope.userInfo.loggedIn : false;
        }

        public clearAll(): void {
            this.cookie.remove(this.cookieUserName);
            this.cookie.remove(this.cookieToken);
            this.setRootUserInfo("", false);
        };
    }

    angular
        .module("appCookie", ["ipCookie"])
        .factory(AppCookie.serviceName, AppCookie);
}
