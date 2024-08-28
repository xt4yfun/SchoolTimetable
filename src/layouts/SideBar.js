import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGraduationCap, faBook, faCog, faUserClock, faUserGear, faUser, faTable, faUsers, faSignOutAlt, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { getRoleByName } from '../Api/Service/RoleService';  
import { PermgetRole } from '../Api/Service/PermissionRoleService';

function SideBar() {
  const location = useLocation();
  const [perms, setPerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPermissions() {
      try {
        const authToken = sessionStorage.getItem('authToken');
        if (!authToken) {
          throw new Error("authToken bulunamadı");
        }

        const decodedToken = JSON.parse(atob(authToken.split('.')[1]));
        const roles = decodedToken.roles.split(',');

        let allPermissions = [];

        for (const roleName of roles) {
          const roleResponse = (await getRoleByName(roleName)).data;
          if (roleResponse && roleResponse.isSuccess) {
            const permissionsResponse = (await PermgetRole(roleResponse.data.id)).data;
            if (permissionsResponse.isSuccess && permissionsResponse.data) {
              const permissionIds = permissionsResponse.data.map(perm => perm.permissonId);
              allPermissions = [...new Set([...allPermissions, ...permissionIds])];
            } else {
              console.error(`Failed to fetch permissions for role ${roleName}:`, permissionsResponse.message);
            }
          } else {
            console.error(`Failed to fetch role ${roleName}:`, roleResponse.message);
          }
        }
        setPerms(allPermissions);
      } catch (error) {
        console.error("Error fetching permissions", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPermissions();
  }, []);

  const links = [
    { to: "/Admin/Dashboard", icon: faHome, label: "Anasayfa", perms: ["26"] },
    { to: "/Admin/Student", icon: faUser, label: "Öğrenci", perms: ["25"] },
    { to: "/Admin/Academic", icon: faGraduationCap, label: "Akademisyen", perms: ["4"] },
    { to: "/Admin/Class", icon: faUsers, label: "Sınıf", perms: ["12"] },
    { to: "/Admin/Courses", icon: faBook, label: "Ders", perms: ["17"] },
    { to: "/Admin/ClassCourses", icon: faAddressBook, label: "Ders Sınıf Bağlantısı", perms: ["9"] },
    { to: "/Admin/ScheduleSetting", icon: faUserClock, label: "Ders Program Ayarı", perms: ["19"] },
    { to: "/Admin/Timetable", icon: faTable, label: "Ders Programı", perms: ["29"] },
    { to: "/Admin/Setting", icon: faCog, label: "Ayarlar", perms: ["10"] },
    { to: "/Admin/UsersSetting", icon: faUserGear, label: "Rol ve İzin", perms: ["33", "36", "39", "41"] },
  ];

  const filteredLinks = links.filter(link => link.perms.some(perm => perms.includes(parseInt(perm))));

  return (
    <nav className="border-r bg-white h-screen p-4 w-64 pt-10">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <Link to="/Logout" aria-label="Çıkış Yap">
            <div
              className={`flex items-center text-black-300 hover:text-blue-500 cursor-pointer rounded-md p-2 mt-2`}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-indigo-500" />
              <span>Çıkış Yap</span>
            </div>
          </Link>
      ) : (
        <>
          {filteredLinks.map(link => (
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
          <Link to="/Logout" aria-label="Çıkış Yap">
            <div
              className={`flex items-center text-black-300 hover:text-blue-500 cursor-pointer rounded-md p-2 mt-2`}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-indigo-500" />
              <span>Çıkış Yap</span>
            </div>
          </Link>
        </>
      )}
    </nav>
  );
}

export default SideBar;
