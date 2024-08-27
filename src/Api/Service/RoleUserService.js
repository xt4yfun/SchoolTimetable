import API_ENDPOINTS from '../Contacst/apiEndpoints';
import AxiosManager from '../../utils/AxiosManager';

const axiosManager = new AxiosManager();

export const addRoleUser = (Data) => {
    return axiosManager.post(API_ENDPOINTS.ROLEUSER.ADD,Data);
};
  
export const deleteRoleUser = (ID) => {
  return  axiosManager.delete(`${API_ENDPOINTS.ROLEUSER.DELETE}?id=${ID}`);
};

export const getAll = () => {
    return axiosManager.get(API_ENDPOINTS.ROLEUSER.GET);
};

export const getRoleUserId = (rolId,userId) => {
    return  axiosManager.get(`${API_ENDPOINTS.ROLEUSER.GETID}?rolId=${rolId}&userId=${userId}`);
};

export const RolegetUser = (ID) => {
    return  axiosManager.get(`${API_ENDPOINTS.ROLEUSER.GETUSER}?id=${ID}`);
};

export const getRole = (ID) => {
    return  axiosManager.get(`${API_ENDPOINTS.ROLEUSER.GETROLE}?id=${ID}`);
};