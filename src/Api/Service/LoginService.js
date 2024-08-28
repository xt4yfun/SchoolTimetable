import API_ENDPOINTS from '../Contacst/apiEndpoints';
import AxiosManager from '../../utils/AxiosManager';

const axiosManager = new AxiosManager();

export const login = (data) => {
    return axiosManager.post(API_ENDPOINTS.AUTH.LOGIN,data);
};

export const register = (data) => {
    return axiosManager.post(API_ENDPOINTS.AUTH.REGISTER,data);
};