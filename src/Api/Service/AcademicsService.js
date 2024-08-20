import AxiosManager from '../../utils/AxiosManager';
import API_ENDPOINTS from '../Contacst/apiEndpoints';

const axiosManager = new AxiosManager();

export const getAcademics = () => {
  return axiosManager.get(API_ENDPOINTS.ACADEMICS.GET);
};

export const getIDAcademics = (academicId) => {
  return axiosManager.get(`${API_ENDPOINTS.ACADEMICS.GETID}?academicID=${academicId}`);
};

export const addAcademics = (academics) => {
  return axiosManager.post(API_ENDPOINTS.ACADEMICS.ADD,academics);
};

export const deleteAcademics = (academicsID) => {
  return axiosManager.put(`${API_ENDPOINTS.ACADEMICS.DELETE}?academicsID=${academicsID}`);
};

export const updateAcademics = (academicData) => {
  return  axiosManager.put(API_ENDPOINTS.ACADEMICS.UPDATE,academicData);
};
