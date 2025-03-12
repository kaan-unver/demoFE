import axios from 'axios';
import { error } from 'console';

const baseURL = process.env.REACT_APP_BASE_URL;

const headers = {
    'Content-Type': 'application/json'
};

const axiosInstanceLogin = axios.create({
    baseURL: baseURL,
    headers: headers,
    timeout: 1000 * 12
});

const responseHandlerLogin = (response: any) => {
    if (response.status === 400) {
        window.location.assign('/login');
    }

    return response;
};

const errorHandler = (error: any) => {
    console.log(error)
    let status = error.response.status;
    if (status === 401) {
        let currentPage = localStorage.getItem('page');

        if (currentPage != 'login') {
            // @ts-ignore
            window.location.assign('/#/login');
            //alert('You have no permission!');
        }
    }
    if (status === 415) {
        // window.location.assign('/login');
    }

    return error.response; //Promise.reject(error.response);
};

const requestHandler = async (request: any) => {
    // Token will be dynamic so we can use any app-specific way to always
    ///fetch the new token before making the call
    // async function getRecaptchaTokenExplicit() {
    //     return new Promise((resolve) => {
    //         window.grecaptcha.ready(() => {
    //             window.grecaptcha.execute(`${process.env.REACT_APP_SITE_KEY}`, { action: 'submit' }).then(function (token: string) {
    //                 const result = resolve(token);
    //                 return result;
    //             });
    //         });
    //     });
    // }
    // request.headers['X-VerifyKey'] = await getRecaptchaTokenExplicit();
    return request;
};
axiosInstanceLogin.interceptors.request.use((request) => requestHandler(request));
axiosInstanceLogin.interceptors.response.use(
    (response) => responseHandlerLogin(response),
    (error) => errorHandler(error)
);

export default axiosInstanceLogin;
