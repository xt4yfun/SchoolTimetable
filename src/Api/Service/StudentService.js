import API_ENDPOINTS from '../Contacst/apiEndpoints';
import AxiosManager from '../../utils/AxiosManager';

const axiosManager = new AxiosManager();

export const getStudent = () => {
    return axiosManager.get(API_ENDPOINTS.STUDENTS.GET);
};

export const getDashboard = () => {
    return axiosManager.get(API_ENDPOINTS.STUDENTS.GETDASHBOARD);
};

export const getStudentID = (studentID) => {
    return axiosManager.get(`${API_ENDPOINTS.STUDENTS.GETID}?studentID=${studentID}`);
};

export const getStudentClass = (classID) => {
    return axiosManager.get(`${API_ENDPOINTS.STUDENTS.GETCLASS}?classID=${classID}`);
};

export const addStudent = (studentData) => {
    return axiosManager.post(API_ENDPOINTS.STUDENTS.ADD,studentData);
};

export const deleteStudent = (studentsID) => {
    return axiosManager.put(`${API_ENDPOINTS.STUDENTS.DELETE}?studentsID=${studentsID}`);
};

export const deleteClassAllStudent = (classId) => {
    return axiosManager.put(`${API_ENDPOINTS.STUDENTS.CLASSALLDELETE}?classId=${classId}`);
};

export const updateStudent = (studentData) => {
    return axiosManager.put(API_ENDPOINTS.STUDENTS.UPDATE,studentData);
};