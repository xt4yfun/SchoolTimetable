import API_ENDPOINTS from '../Contacst/apiEndpoints';
import AxiosManager from '../../utils/AxiosManager';

const axiosManager = new AxiosManager();


export const getAllPerm = () => {
    return axiosManager.get(API_ENDPOINTS.PERM.GET);
};