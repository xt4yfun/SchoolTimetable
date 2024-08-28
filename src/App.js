import { Logout } from "./Api/Api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Dashboard from "./Admin/Dashboard/Dashboard";
import Student from "./Admin/Student/Student";
import Class from "./Admin/Class/Class";
import Courses from "./Admin/Courses/Courses";
import Add from "./Admin/Student/NewStudent";
import View from "./Admin/Student/ViewStudent";
import UpdateStudent from "./Admin/Student/UpdateStudent";
import Academic from "./Admin/Academic/Academic";
import NewAcademic from "./Admin/Academic/NewAcademic";
import UpdateAcademic from "./Admin/Academic/UpdateAcademic";
import AcademicView from "./Admin/Academic/ViewAcademic";
import ClassCourses from "./Admin/ClassCourses/ClassCourses";
import ScheduleSetting from "./Admin/ScheduleSetting/ScheduleSetting";
import Setting from "./Admin/Setting/Setting";
import Timetable from "./Admin/Timetable/Timetable";
import UsersSetting from "./Admin/UsersSetting/UsersSetting";
import NotFound from "./layouts/PageNotFound";
import NoAccess from "./layouts/NoAccess"; // NoAccess import
import withPermission from "./Api/Contacst/withPermission"; // HOC import

// Create components wrapped with permission checking
const DashboardWithPermission = withPermission(Dashboard, ['26']);
const StudentWithPermission = withPermission(Student, ['25']);
const AddStudentWithPermission = withPermission(Add, ['21']);
const UpdateStudentWithPermission = withPermission(UpdateStudent, ['22','25']);
const ViewStudentWithPermission = withPermission(View, ['25']);
const ClassWithPermission = withPermission(Class, ['12']);
const CoursesWithPermission = withPermission(Courses, ['17']);
const AcademicWithPermission = withPermission(Academic, ['4']);
const NewAcademicWithPermission = withPermission(NewAcademic, ['1']);
const UpdateAcademicWithPermission = withPermission(UpdateAcademic, ['2']);
const AcademicViewWithPermission = withPermission(AcademicView, ['4']);
const ClassCoursesWithPermission = withPermission(ClassCourses, ['9']);
const ScheduleSettingWithPermission = withPermission(ScheduleSetting, ['19']);
const TimetableWithPermission = withPermission(Timetable, ['29']);
const SettingWithPermission = withPermission(Setting, ['10']);
const UsersSettingWithPermission = withPermission(UsersSetting, ['33','36','39','41']);


function App() {
  const isAuthenticated = sessionStorage.getItem('authToken');
  const Redirect = <Navigate to="/Login" />;
  const NoAccessPage = <NoAccess />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Logout" element={<Logout />} />
        {/* Dashboard url */}
        <Route path="/" element={isAuthenticated ? <DashboardWithPermission /> : Redirect} />
        <Route path="/Admin" element={isAuthenticated ? <DashboardWithPermission /> : Redirect} />
        <Route path="/Admin/Dashboard" element={isAuthenticated ? <DashboardWithPermission /> : Redirect} />

        {/* get all Student */}
        <Route path="/Admin/Student" element={isAuthenticated ? <StudentWithPermission /> : Redirect} />
        <Route path="/Admin/Student/New" element={isAuthenticated ? <AddStudentWithPermission /> : Redirect} />
        <Route path="/Admin/Student/Update/:id" element={isAuthenticated ? <UpdateStudentWithPermission /> : Redirect} />
        <Route path="/Admin/Student/:id" element={isAuthenticated ? <ViewStudentWithPermission /> : Redirect} />
        
        {/* manage Class */}
        <Route path="/Admin/Class" element={isAuthenticated ? <ClassWithPermission /> : Redirect} />
        {/* manage Courses */}
        <Route path="/Admin/Courses" element={isAuthenticated ? <CoursesWithPermission /> : Redirect} />
        {/* manage Academic */}
        <Route path="/Admin/Academic" element={isAuthenticated ? <AcademicWithPermission /> : Redirect} />
        <Route path="/Admin/Academic/New" element={isAuthenticated ? <NewAcademicWithPermission /> : Redirect} />
        <Route path="/Admin/Academic/Update/:id" element={isAuthenticated ? <UpdateAcademicWithPermission /> : Redirect} />
        <Route path="/Admin/Academic/:id" element={isAuthenticated ? <AcademicViewWithPermission /> : Redirect} />
        
        {/* manage CoursesClass */}
        <Route path="/Admin/ClassCourses" element={isAuthenticated ? <ClassCoursesWithPermission /> : Redirect} />
        {/* manage ScheduleSetting */}
        <Route path="/Admin/ScheduleSetting" element={isAuthenticated ? <ScheduleSettingWithPermission /> : Redirect} />
        {/* manage Timetable */}
        <Route path="/Admin/Timetable" element={isAuthenticated ? <TimetableWithPermission /> : Redirect} />
        {/* manage Setting */}
        <Route path="/Admin/Setting" element={isAuthenticated ? <SettingWithPermission /> : Redirect} />
        {/* manage Users Setting */}
        <Route path="/Admin/UsersSetting" element={isAuthenticated ? <UsersSettingWithPermission /> : Redirect} />
        
        <Route path="/no-access" element={NoAccessPage} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
