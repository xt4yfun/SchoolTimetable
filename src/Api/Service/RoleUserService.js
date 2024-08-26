import API_ENDPOINTS from '../Contacst/apiEndpoints';
import AxiosManager from '../../utils/AxiosManager';

const axiosManager = new AxiosManager();

export const addRole = (Data) => {
    return axiosManager.post(API_ENDPOINTS.ROLEUSER.ADD,Data);
};
  
export const deleteRole = (ID) => {
  return  axiosManager.put(`${API_ENDPOINTS.ROLEUSER.DELETE}?id=${ID}`);
};

export const getAll = () => {
    return axiosManager.post(API_ENDPOINTS.ROLEUSER.GET);
};

export const getId = (ID) => {
    return  axiosManager.put(`${API_ENDPOINTS.ROLEUSER.GETID}?id=${ID}`);
};

export const getUser = (ID) => {
    return  axiosManager.put(`${API_ENDPOINTS.ROLEUSER.GETUSER}?id=${ID}`);
};

export const getRole = (ID) => {
    return  axiosManager.put(`${API_ENDPOINTS.ROLEUSER.GETROLE}?id=${ID}`);
};