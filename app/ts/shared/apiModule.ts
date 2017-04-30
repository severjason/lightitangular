namespace lightItApp {
    "use strict";

    import UnderscoreStatic = _.UnderscoreStatic;

    export interface IApi extends ng.IDirective {
        getProducts(): any;
        getProductReview(productId: string): any;
        signUp(name: string, password: string): any;
        login(name: string, password: string): any;
    }

    class API {

        public static $inject: string[] = ["$http", "_", "userService"];
        public static serviceName: string = "apiService";

        private apiUrlStr: string;
        private productsUrlStr: string;
        private productReviewUrlStr: string;
        private signUpUrlStr: string;
        private loginUrlStr: string;
        private httpService: ng.IHttpService;
        private underscore: UnderscoreStatic;
        private userCookieService: ICookie;

        constructor($http: ng.IHttpService, _: UnderscoreStatic, userService: ICookie) {
            this.apiUrlStr = "http://smktesting.herokuapp.com/";
            this.productsUrlStr = "api/products/";
            this.productReviewUrlStr = "api/reviews/";
            this.signUpUrlStr = "api/register/";
            this.loginUrlStr = "api/login/";
            this.httpService = $http;
            this.underscore = _;
            this.userCookieService = userService;
        }

        get http(): ng.IHttpService {
            return this.httpService;
        }

        get _(): UnderscoreStatic {
            return this.underscore;
        }

        get apiUrl(): string {
            return this.apiUrlStr;
        }

        get productsUrl(): string {
            return this.productsUrlStr;
        }

        get signUpUrl(): string {
            return this.signUpUrlStr;
        }

        get loginUrl(): string {
            return this.loginUrlStr;
        }

        get userService(): any {
            return this.userCookieService;
        }

        public getProducts(): any {
            return this.http.get(this.apiUrl + this.productsUrl);
        }

        public getProductReview(productId: string): any {
            return this.http.get(this.apiUrl + this.productReviewUrlStr + `${productId}`);
        }

        public signUp(signUpName: string, signUpPassword: string): any {
            return this.http.post(this.apiUrl + this.signUpUrl, {
                username: this._.escape(signUpName),
                password: signUpPassword,
            });
        }

        public login(loginName: string, loginPassword: string): any {
            return this.http.post(this.apiUrl + this.loginUrl, {
                headers: {"x-access-token": this.userService.getToken()},
                username: this._.escape(loginName),
                password: loginPassword,
            });
        }
    }
    angular
        .module("appAPI", ["appUnderscore", "appCookie"])
        .factory(API.serviceName, API);
}
