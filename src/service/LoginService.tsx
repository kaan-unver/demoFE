import axiosInstanceLogin from '../base/rest/baserestservice/loginPageBaseRestService';
import axiosInstance from '../base/rest/baserestservice/baseRestService';
import ScreenCodes from '../base/screens/screenCodes.json';
export default class LoginService {
    Login(mail: string, password: string) {
        let data = JSON.stringify({ mail: mail, password: password });
        return axiosInstanceLogin.post('Auth/login', data, { headers: { SC: ScreenCodes.login } }).then((response) => response.data);
    }
    ForgetPassword(mail: string) {
        let data = JSON.stringify({ mail: mail });
        return axiosInstance.post('Auth/forgetPassword', data, { headers: { SC: ScreenCodes.forgetPassword } }).then((response) => response.data);
    }

    ResetPassword(data: {}) {
        return axiosInstance.post('Auth/resetPassword', data, { headers: { SC: ScreenCodes.resetPassword } }).then((response) => response.data);
    }
}
