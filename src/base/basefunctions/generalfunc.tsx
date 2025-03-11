class GeneralFunc {
    constructor() {}

    _setLoading(value: any) {
        window.localStorage.setItem('isLoading', value);
        window.dispatchEvent(new Event('storage'));
    }

    showLoading() {
        this._setLoading('1');
    }
    hideLoading() {
        this._setLoading('0');
    }

    validateEmail(email: any) {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email);
    }

    responseIsValid(response: any) {
        if (![null, undefined, ''].includes(response) && ![null, undefined, ''].includes(response.data) && 'data' in response.data) {
            return true;
        }
        return false;
    }

    messagesIsValid(error: any) {
        if (![null, undefined, ''].includes(error) && ![null, undefined, ''].includes(error.data) && 'messages' in error && ![null, undefined, ''].includes(error.data.messages)) {
            return true;
        }

        return false;
    }

    checkData(response: any) {
        if (![null, undefined, ''].includes(response)) {
            return true;
        }
        return false;
    }

    getConfigURL(response: any, defaultValue: any = '') {
        if ('config' in response && 'url' in response.config) return response.config.url;

        return defaultValue;
    }
    getErrorMessages(response: any, defaultValue: any = '') {
        if ('data' in response && 'messages' in response.data) return response.config.url;

        return defaultValue;
    }
}

export default new GeneralFunc();
