import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGraduationCap, faBook,faCog,faUserClock,faUserGear, faUser,faTable, faUsers, faSignOutAlt,faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();

  const links = [
    { to: "/Admin/Dashboard", icon: faHome, label: "Anasayfa" },
    { to: "/Admin/Student", icon: faUser, label: "Öğrenci" },
    { to: "/Admin/Academic", icon: faGraduationCap, label: "Akademisyen" },
    { to: "/Admin/Class", icon: faUsers, label: "Sınıf" },
    { to: "/Admin/Courses", icon: faBook, label: "Ders" },
    { to: "/Admin/ClassCourses", icon: faAddressBook, label: "Ders Sınıf Bağlantısı" },
    { to: "/Admin/ScheduleSetting", icon: faUserClock, label: "Ders Program Ayarı" },
    { to: "/Admin/Timetable", icon: faTable, label: "Ders Programı" },
    { to: "/Admin/Setting", icon: faCog, label: "Ayarlar" },
    { to: "/Admin/UsersSetting", icon: faUserGear, label: "Rol ve İzin" },
    { to: "/Logout", icon: faSignOutAlt, label: "Çıkış Yap" },
  ];

  return (
    <nav className="border-r bg-white h-screen p-4 w-64 pt-10">
      {links.map((link) => (
        <Link key={link.to} to={link.to} aria-label={link.label}>
          <div
            className={`flex items-center text-black-300 hover:text-blue-500 cursor-pointer rounded-md p-2 mb-2 ${
              location.pathname === link.to ||
              (location.pathname === "/Admin" && link.to === "/Admin/Dashboard") ? "bg-gray-200" : ""
            }`}
          >
            <FontAwesomeIcon icon={link.icon} className="mr-3 text-indigo-500" />
            <span>{link.label}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
}

export default SideBar;
