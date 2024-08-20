import API_ENDPOINTS from '../Contacst/apiEndpoints';
import AxiosManager from '../../utils/AxiosManager';

const axiosManager = new AxiosManager();

export const getClass = () => {
    return axiosManager.get(API_ENDPOINTS.CLASS.GET);
};

export const addClass = (classData) => {
    return axiosManager.post(API_ENDPOINTS.CLASS.ADD,classData);
  };
  
  export const deleteClass = (clsID) => {
    return  axiosManager.put(`${API_ENDPOINTS.CLASS.DELETE}?id=${clsID}`);
  };
  
  export const updateClass = (classData) => {
    return axiosManager.put(API_ENDPOINTS.CLASS.UPDATE,classData);
  };