class AuthFunc {
    authenticated: boolean = false;
    constructor() {
        this.authenticated = localStorage.getItem('isLoginCheck') === 'true' ? true : false;
    }

    login(cb: any) {
        this.authenticated = true;
        cb();
    }

    loginOnly() {
        this.authenticated = true;
    }

    logout(cb: any) {
        this.authenticated = false;
        cb();
    }

    logoutOnly() {
        this.authenticated = false;
        localStorage.clear();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new AuthFunc();
