import React from 'react';
import { Navigate } from 'react-router-dom';
import { getRoleByName } from '../Service/RoleService';
import { PermgetRole } from '../Service/PermissionRoleService';

const withPermission = (WrappedComponent, requiredPerms = []) => {
  return function WithPermissionComponent(props) {
    const authToken = sessionStorage.getItem('authToken');
    const [perms, setPerms] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
      async function fetchPermissions() {
        try {
          if (!authToken) throw new Error("authToken bulunamadı");

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
                console.error(`Rol ${roleName} için izinler alınamadı:`, permissionsResponse.message);
              }
            } else {
              console.error(`Rol ${roleName} alınamadı:`, roleResponse.message);
            }
          }

          setPerms(allPermissions);
        } catch (error) {
          console.error("İzinleri alırken hata oluştu", error);
          setError("İzinleri alırken bir hata oluştu.");
        } finally {
          setLoading(false);
        }
      }

      fetchPermissions();
    }, [authToken]);

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>Hata: {error}</p>;

    const hasPermission = requiredPerms.some(perm => perms.includes(parseInt(perm, 10)));

    if (!hasPermission) {
      return <Navigate to="/no-access" replace />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withPermission;
