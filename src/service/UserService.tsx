import axiosInstance from "../base/rest/baserestservice/baseRestService";
import ScreenCodes from '../base/screens/screenCodes.json';

export default class UserService {
    addUser(data:any) {
        return axiosInstance.post(`User/add`, data, { headers: { SC: ScreenCodes.tenantUser, 'Content-Type': 'multipart/form-data' } });
    }
}
