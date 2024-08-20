import API_ENDPOINTS from '../Contacst/apiEndpoints';
import AxiosManager from '../../utils/AxiosManager';

const axiosManager = new AxiosManager();

export const getCourses = () => {
    return axiosManager.get(API_ENDPOINTS.COURSES.GET);
};

export const addCourses = (courseData) => {
    return axiosManager.post(API_ENDPOINTS.COURSES.ADD,courseData);
  };
  
  export const deleteCourses = (coursesID) => {
    return  axiosManager.put(`${API_ENDPOINTS.COURSES.DELETE}?coursesID=${coursesID}`);
  };
  
  export const updateCourses = (courseData) => {
    return axiosManager.put(API_ENDPOINTS.COURSES.UPDATE,courseData);
  };