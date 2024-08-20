import API_ENDPOINTS from '../Contacst/apiEndpoints';
import AxiosManager from '../../utils/AxiosManager';

const axiosManager = new AxiosManager();

export const getAddAll = () => {
    return axiosManager.post(API_ENDPOINTS.TIMETABLE.ADDALL);
};

export const addTimetableClass = (classID) => {
    return axiosManager.post(`${API_ENDPOINTS.TIMETABLE.ADDCLASS}?classID=${classID}`);
  };
  
  export const timetableGetAll = () => {
    return  axiosManager.get(API_ENDPOINTS.TIMETABLE.GETALL);
  };
  
  export const getClassList = (classID) => {
    return  axiosManager.get(`${API_ENDPOINTS.TIMETABLE.GETCLASS}?classID=${classID}`);
  };
  
  export const getDayList = (dayName) => {
    return  axiosManager.get(`${API_ENDPOINTS.TIMETABLE.GETDAY}?dayName=${dayName}`);
  };

  export const timetableDeleteAll = () => {
    return  axiosManager.put(API_ENDPOINTS.TIMETABLE.DELETEALL);
  };

  export const deleteClass = (classID) => {
    return  axiosManager.put(`${API_ENDPOINTS.TIMETABLE.DELETECLASS}?classID=${classID}`);
  };