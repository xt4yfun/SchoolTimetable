import API_ENDPOINTS from '../Contacst/apiEndpoints';
import AxiosManager from '../../utils/AxiosManager';

const axiosManager = new AxiosManager();

export const getCoursesClass = () => {
    return axiosManager.get(API_ENDPOINTS.CLASSCOURSE.GET);
};

export const addCoursesClass = (classCourseData) => {
    return axiosManager.post(API_ENDPOINTS.CLASSCOURSE.ADD,classCourseData);
  };

export const addAllClassCourse = () => {
    return axiosManager.post(API_ENDPOINTS.CLASSCOURSE.ALLCLASSCOURSE);
  };

export const addAllClass = (classID) => {
    return axiosManager.post(`${API_ENDPOINTS.CLASSCOURSE.CLASSALLCLASSCOURSE}?classID=${classID}`);
  };
  
  export const deleteCoursesClass = (clscoID) => {
    return  axiosManager.put(`${API_ENDPOINTS.CLASSCOURSE.DELETE}?classCourseID=${clscoID}`);
  };
  
  export const getCoursesClassID = (classID) => {
    return axiosManager.get(`${API_ENDPOINTS.CLASSCOURSE.GETCLASS}?classID=${classID}`);
  };