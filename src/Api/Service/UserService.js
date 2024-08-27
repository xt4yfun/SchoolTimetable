import API_ENDPOINTS from '../Contacst/apiEndpoints';
import AxiosManager from '../../utils/AxiosManager';

const axiosManager = new AxiosManager();


export const getAllUser = () => {
    return axiosManager.get(API_ENDPOINTS.USER.GET);
};

export const deleteUser = (id) => {
    return axiosManager.delete(`${API_ENDPOINTS.USER.DELETE}?id=${id}`);
};

export const updateUser = (data) => {
    return axiosManager.put(API_ENDPOINTS.USER.UPDATE,data);
};