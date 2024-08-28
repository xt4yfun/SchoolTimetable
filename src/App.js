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
// AuthToken
import { Logout } from "./Api/Api";
import NotFound from "./layouts/PageNotFound";





function App() {
  const isAuthenticated = sessionStorage.getItem('authToken');
  const Redirect = <Navigate to="/Login" />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Logout" element={<Logout />} />
        {/* Dashboard url */}
        <Route path="/" element={isAuthenticated ? <Dashboard /> : Redirect} />

        <Route path="/Admin" element={isAuthenticated ? <Dashboard /> : Redirect} />

        <Route path="/Admin/Dashboard" element={isAuthenticated ? <Dashboard /> : Redirect} />

        {/* get all Student */}
        <Route path="/Admin/Student" element={isAuthenticated ? <Student /> : Redirect} />
        <Route path="/Admin/Student/New" element={isAuthenticated ? <Add /> : Redirect} />
        <Route path="/Admin/Student/Update/:id" element={isAuthenticated ? <UpdateStudent /> : Redirect} />
        <Route path="/Admin/Student/:id" element={isAuthenticated ? <View /> : Redirect} />
        {/* manage Class */}
        <Route path="/Admin/Class" element={isAuthenticated ? <Class /> : Redirect} />
        {/* manage Courses */}
        <Route path="/Admin/Courses" element={isAuthenticated ? <Courses /> : Redirect} />
        {/* manage Academic */}
        <Route path="/Admin/Academic" element={isAuthenticated ? <Academic /> : Redirect} />
        <Route path="/Admin/Academic/New" element={isAuthenticated ? <NewAcademic /> : Redirect} />
        <Route path="/Admin/Academic/Update/:id" element={isAuthenticated ? <UpdateAcademic /> : Redirect} />
        <Route path="/Admin/Academic/:id" element={isAuthenticated ? <AcademicView /> : Redirect} />
        {/* manage CoursesClass */}
        <Route path="/Admin/ClassCourses" element={isAuthenticated ? <ClassCourses /> : Redirect} />
        {/* manage ScheduleSetting */}
        <Route path="/Admin/ScheduleSetting" element={isAuthenticated ? <ScheduleSetting /> : Redirect} />
        {/* manage Timetable */}
        <Route path="/Admin/Timetable" element={isAuthenticated ? <Timetable /> : Redirect} />
        {/* manage Setting */}
        <Route path="/Admin/Setting" element={isAuthenticated ? <Setting /> : Redirect} />
        {/* manage Users Setting */}
        <Route path="/Admin/UsersSetting" element={isAuthenticated ? <UsersSetting /> : Redirect} />
        <Route path="*" element={<NotFound />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;