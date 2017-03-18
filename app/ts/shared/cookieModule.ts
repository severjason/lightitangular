namespace lightItApp {
    "use strict";

    export interface ICookie extends ng.IDirective {
        save(name?: string, token?: string): void;
        getToken(): string | boolean;
        getUserName(): string | boolean;
        remove(): void;
    }

    class AppCookie implements ICookie {

        public static $inject: string[] = ["ipCookie"];
        public static serviceName: string = "userService";

        public cookieUserName: string;
        public cookieToken: string;
        private ipCookie: angular.cookie.CookieService;

        constructor(private ipCookieService: angular.cookie.CookieService) {
            this.cookieUserName = "username";
            this.cookieToken = "token";
            this.ipCookie = ipCookieService;
        };

        get cookie(): angular.cookie.CookieService {
            return this.ipCookie;
        }

        public save(name: string, token: string): void {
            this.cookie(this.cookieUserName, name);
            this.cookie(this.cookieToken, token);
        };

        public getToken(): string | boolean {
            return (this.cookie(this.cookieToken)) ? this.cookie(this.cookieToken) : "";
        };

        public getUserName(): string|boolean {
            return (this.cookie(this.cookieUserName)) ? this.cookie(this.cookieUserName) : "";
        };

        public remove(): void {
            this.cookie.remove(this.cookieUserName);
            this.cookie.remove(this.cookieToken);
        };

    }

    angular
        .module("appCookie", ["ipCookie"])
        .factory(AppCookie.serviceName, AppCookie);
}
