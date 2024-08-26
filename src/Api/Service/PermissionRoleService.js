import API_ENDPOINTS from '../Contacst/apiEndpoints';
import AxiosManager from '../../utils/AxiosManager';

const axiosManager = new AxiosManager();

export const addPermRole = (Data) => {
    return axiosManager.post(API_ENDPOINTS.PERMISSIONROLE.ADD,Data);
};
  
export const deletePermRole = (ID) => {
  return  axiosManager.put(`${API_ENDPOINTS.PERMISSIONROLE.DELETE}?id=${ID}`);
};

export const getAll = () => {
    return axiosManager.post(API_ENDPOINTS.PERMISSIONROLE.GETALL);
};
  
export const getId = (ID) => {
    return  axiosManager.put(`${API_ENDPOINTS.PERMISSIONROLE.GET}?id=${ID}`);
};
  
export const getRole = (ID) => {
    return  axiosManager.put(`${API_ENDPOINTS.PERMISSIONROLE.GETROLE}?id=${ID}`);
};
  
export const getPerm = (ID) => {
    return  axiosManager.put(`${API_ENDPOINTS.PERMISSIONROLE.GETPERM}?id=${ID}`);
};