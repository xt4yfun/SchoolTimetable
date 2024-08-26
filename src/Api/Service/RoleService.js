import API_ENDPOINTS from '../Contacst/apiEndpoints';
import AxiosManager from '../../utils/AxiosManager';

const axiosManager = new AxiosManager();

export const addRole = (Data) => {
    return axiosManager.post(API_ENDPOINTS.ROLE.ADD,Data);
};
  
export const deleteRole = (ID) => {
  return  axiosManager.put(`${API_ENDPOINTS.ROLE.DELETE}?roleid=${ID}`);
};

export const getAll = () => {
    return axiosManager.post(API_ENDPOINTS.ROLE.GET);
};