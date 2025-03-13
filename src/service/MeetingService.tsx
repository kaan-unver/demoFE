import axiosInstance from "../base/rest/baserestservice/baseRestService";
import ScreenCodes from '../base/screens/screenCodes.json';

export default class MeetingService {
    getAll() {
        return axiosInstance.get(`Meeting/getAll`, { headers: { SC: ScreenCodes.dispatch} });
    }
    add(data:any) {
        return axiosInstance.post(`Meeting/add`, data, { headers: { SC: ScreenCodes.dispatch, 'Content-Type': 'multipart/form-data' } });
    }
    delete(id:any) {
        debugger
        return axiosInstance.put(`Meeting/delete`, id, { headers: { SC: ScreenCodes.dispatch } });
    }
}
