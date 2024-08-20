const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const API_ENDPOINTS = {
    ACADEMICS: {
      GET: `${BASE_URL}${process.env.REACT_APP_ACADEMICS_ENDPOINT}`,
      GETID: `${BASE_URL}${process.env.REACT_APP_ACADEMICS_ENDPOINT}/getById`,
      ADD: `${BASE_URL}${process.env.REACT_APP_ACADEMICS_ENDPOINT}`,
      DELETE: `${BASE_URL}${process.env.REACT_APP_ACADEMICS_ENDPOINT}/delete`,
      UPDATE: `${BASE_URL}${process.env.REACT_APP_ACADEMICS_ENDPOINT}/update`,
    },
    AUTH:{
        LOGIN:`${BASE_URL}${process.env.REACT_APP_AUTH_ENDPOINT}/login`,
        REGISTER:`${BASE_URL}${process.env.REACT_APP_AUTH_ENDPOINT}/register`,
    },
    CLASS: {
      GET: `${BASE_URL}${process.env.REACT_APP_CLASS_ENDPOINT}`,
      ADD: `${BASE_URL}${process.env.REACT_APP_CLASS_ENDPOINT}/add`,
      DELETE: `${BASE_URL}${process.env.REACT_APP_CLASS_ENDPOINT}/delete`,
      UPDATE: `${BASE_URL}${process.env.REACT_APP_CLASS_ENDPOINT}/update`,
    },
    CLASSCOURSE: {
      GET: `${BASE_URL}${process.env.REACT_APP_CLASSCOURSE_ENDPOINT}/getAll`,
      ADD: `${BASE_URL}${process.env.REACT_APP_CLASSCOURSE_ENDPOINT}`,
      DELETE: `${BASE_URL}${process.env.REACT_APP_CLASSCOURSE_ENDPOINT}/Deleted`,
      GETCLASS: `${BASE_URL}${process.env.REACT_APP_CLASSCOURSE_ENDPOINT}/getClassAll`,
      ALLCLASSCOURSE: `${BASE_URL}${process.env.REACT_APP_CLASSCOURSE_ENDPOINT}/allClassCourse`,
      CLASSALLCLASSCOURSE: `${BASE_URL}${process.env.REACT_APP_CLASSCOURSE_ENDPOINT}/ClassAllAddCourse`,
    },
    COURSES: {
      GET: `${BASE_URL}${process.env.REACT_APP_COURSES_ENDPOINT}/getAll`,
      GETID: `${BASE_URL}${process.env.REACT_APP_COURSES_ENDPOINT}/getBy`,
      ADD: `${BASE_URL}${process.env.REACT_APP_COURSES_ENDPOINT}`,
      DELETE: `${BASE_URL}${process.env.REACT_APP_COURSES_ENDPOINT}/delete`,
      UPDATE: `${BASE_URL}${process.env.REACT_APP_COURSES_ENDPOINT}/update`,
    },
    SCHEDULESETTING: {
      GET: `${BASE_URL}${process.env.REACT_APP_SCHEDULESETTING_ENDPOINT}/all`,
      GETBY: `${BASE_URL}${process.env.REACT_APP_SCHEDULESETTING_ENDPOINT}`,
      ADD: `${BASE_URL}${process.env.REACT_APP_SCHEDULESETTING_ENDPOINT}`,
      UPDATE: `${BASE_URL}${process.env.REACT_APP_SCHEDULESETTING_ENDPOINT}`,
    },
    STUDENTS: {
      GET: `${BASE_URL}${process.env.REACT_APP_STUDENTS_ENDPOINT}`,
      GETDASHBOARD: `${BASE_URL}${process.env.REACT_APP_STUDENTS_ENDPOINT}/Dashboard`,
      GETID: `${BASE_URL}${process.env.REACT_APP_STUDENTS_ENDPOINT}/getById`,
      GETCLASS: `${BASE_URL}${process.env.REACT_APP_STUDENTS_ENDPOINT}/class`,
      ADD: `${BASE_URL}${process.env.REACT_APP_STUDENTS_ENDPOINT}`,
      DELETE: `${BASE_URL}${process.env.REACT_APP_STUDENTS_ENDPOINT}/delete`,
      CLASSALLDELETE: `${BASE_URL}${process.env.REACT_APP_STUDENTS_ENDPOINT}/classDeleteAll`,
      UPDATE: `${BASE_URL}${process.env.REACT_APP_STUDENTS_ENDPOINT}/update`,
    },
    TIMETABLE: {
      ADDALL: `${BASE_URL}${process.env.REACT_APP_TIMETABLE_ENDPOINT}`,
      ADDCLASS: `${BASE_URL}${process.env.REACT_APP_TIMETABLE_ENDPOINT}/classBy`,
      GETALL: `${BASE_URL}${process.env.REACT_APP_TIMETABLE_ENDPOINT}/getAll`,
      GETCLASS: `${BASE_URL}${process.env.REACT_APP_TIMETABLE_ENDPOINT}/getClassList`,
      GETDAY: `${BASE_URL}${process.env.REACT_APP_TIMETABLE_ENDPOINT}/getDayList`,
      DELETEALL: `${BASE_URL}${process.env.REACT_APP_TIMETABLE_ENDPOINT}/deleteAll`,
      DELETECLASS: `${BASE_URL}${process.env.REACT_APP_TIMETABLE_ENDPOINT}/deleteClass`,
    },
  };
  
  export default API_ENDPOINTS;

  