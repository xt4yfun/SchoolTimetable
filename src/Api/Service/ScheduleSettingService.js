import API_ENDPOINTS from '../Contacst/apiEndpoints';
import AxiosManager from '../../utils/AxiosManager';

const axiosManager = new AxiosManager();

export const getScheduleSetting = () => {
    return axiosManager.get(API_ENDPOINTS.SCHEDULESETTING.GET);
};

export const getScheduleSettingID = () => {
    return axiosManager.get(API_ENDPOINTS.SCHEDULESETTING.GETBY);
};

export const addScheduleSetting = (ScheduleSettingData) => {
    return axiosManager.post(API_ENDPOINTS.SCHEDULESETTING.ADD,ScheduleSettingData);
};

export const updateScheduleSetting = (ScheduleSettingData) => {
    return axiosManager.put(API_ENDPOINTS.SCHEDULESETTING.UPDATE,ScheduleSettingData);
};