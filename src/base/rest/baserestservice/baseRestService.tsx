import axios from 'axios';
import { AxiosError } from 'axios';
import store from '../../reduxstore';
import GeneralFunc from '../../basefunctions/generalfunc';
import { useNavigate } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom'
const baseURL = process.env.REACT_APP_BASE_URL;
let headers = {
    'Content-Type': 'application/json'
};
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: headers
});

const requestHandler = async (request: any) => {
    const updatejwt = {
        type: 'Update_Loginjwt',
        payload: localStorage.getItem('jwttoken')
    };
    store.dispatch(updatejwt);

    const jwttoken = store.getState().jwttoken;
    request.headers['X-Authorization'] = `Bearer ${jwttoken}`;
    return request;
};
const responseHandler = (response: any) => {
    if (response.data.success == true) {
        localStorage.setItem('isSuccess', 'true');
    } else {
        localStorage.setItem('isSuccess', 'false');
    }

    return response;
};

const errorHandler = (error: any) => {
    // const navigate = useNavigate();

    if (!error?.response) {
        console.log('No Server Response');
        GeneralFunc.hideLoading();
        return;
    } else if (error?.code === AxiosError.ERR_NETWORK) {
        console.log('Network Error');
        GeneralFunc.hideLoading();
        return;
    }
    if (error != null && error.response != null && error.response.status === 401 && error.response.data.code == 1110) {
        //localStorage.clear();
        //@ts-ignore
        window.location.replace('#/login');
        window.location.reload();
        //console.log("Login forwarding prevent!")
        return;
    }
    if (error == null || error.response == null) {
        return;
    }

    if (error.response.status === 405) {
        window.localStorage.setItem('isUnAuthorizedEndpoint', '1');
        window.dispatchEvent(new Event('storage'));
    } else if (error.response.status === 400) {
        localStorage.setItem('resultMessage', '400');
    }

    if (error.response.data.code != 1110) return Promise.reject(error.response);
};

//Step-3: Configure/make use of request & response interceptors from Axios
//Note: You can create one method say configureInterceptors, add below in that,
//export and call it in an init function of the application/page.

axiosInstance.interceptors.request.use((request) => requestHandler(request));

axiosInstance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);

export default axiosInstance;
