import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { faTrashCan, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addRole, deleteRole, getAll } from '../../Api/Service/RoleService';
import { getRole, addPermRole, deletePermRole, getAllPR } from '../../Api/Service/PermissionRoleService';
import { getAllPerm } from '../../Api/Service/PermissionService';
import Swal from 'sweetalert2';

function UsersSetting() {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {
        try {
            const response = await getAll();
            setRoles(response.data.data);
        } catch (error) {
            console.error("Rol listesi alınırken hata oluştu:", error);
        }
    };

    const handleDeleteRole = async (roleId) => {
        const result = await Swal.fire({
            title: 'Silmek istediğinize emin misiniz?',
            text: "Bu işlem geri alınamaz!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Evet, sil!',
            cancelButtonText: 'Hayır, iptal et'
        });

        if (result.isConfirmed) {
            try {
                await deleteRole(roleId);
                Swal.fire('Silindi!', 'Rol başarıyla silindi.', 'success');
                loadRoles();
            } catch (error) {
                console.error("Rol silinirken hata oluştu:", error);
                Swal.fire('Hata!', 'Rol silinirken bir hata oluştu.', 'error');
            }
        }
    };

    const handleEditRolePermissions = async (roleId) => {
        try {
            const allPerms = await getAllPerm();
            const rolePerms = await getRole(roleId);
            const rolePermissionIds = rolePerms.data.permissions.map(perm => perm.data.id);
    
            const { value: selectedPermIds } = await Swal.fire({
                title: 'İzinleri Düzenle',
                input: 'checkbox',
                inputOptions: allPerms.data.data.reduce((options, perm) => {
                    options[perm.id] = perm.permissionName;
                    return options;
                }, {}),
                inputValue: rolePermissionIds.reduce((values, permId) => {
                    return { ...values, [permId]: true };
                }, {}),
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'En az bir izin seçmelisiniz!';
                    }
                }
            });
    
            if (selectedPermIds) {
                // Seçilen izinleri role ekleme/silme işlemleri
                for (const perm of allPerms.data.data) {
                    const isChecked = selectedPermIds.includes(perm.id.toString());
                    const wasChecked = rolePermissionIds.includes(perm.id);
    
                    if (isChecked && !wasChecked) {
                        await addPermRole({ roleId, permissionId: perm.id });
                    } else if (!isChecked && wasChecked) {
                        const allPR = await getAllPR(roleId, perm.id);
                        await deletePermRole(allPR.data.id);
                    }
                }
    
                Swal.fire('Başarılı!', 'İzinler başarıyla güncellendi.', 'success');
                loadRoles();
            }
        } catch (error) {
            console.error("İzinler güncellenirken hata oluştu:", error);
            Swal.fire('Hata!', 'İzinler güncellenirken bir hata oluştu.', 'error');
        }
    };

    const handleAddRole = async () => {
        const { value: newRoleName } = await Swal.fire({
            title: 'Yeni Rol Adı Girin',
            input: 'text',
            inputLabel: 'Rol Adı',
            inputPlaceholder: 'Rol adı girin',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Lütfen bir rol adı girin!';
                }
            }
        });

        if (newRoleName) {
            try {
                await addRole({ rolName: newRoleName });
                Swal.fire('Başarılı!', 'Yeni rol başarıyla eklendi.', 'success');
                loadRoles(); // Ekleme işleminden sonra rolleri yeniden yükle
            } catch (error) {
                console.error("Rol eklenirken hata oluştu:", error);
                Swal.fire('Hata!', 'Rol eklenirken bir hata oluştu.', 'error');
            }
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-center hover:text-indigo-500">Kullanıcı Rol</h2>
            <div className="grid grid-cols-3 grid-rows-1 gap-3">
                <div className="shadow-md flex-row px-1 mt-5 items-center pt-2 pb-2 mb-2 justify-center rounded-lg ml-10 bg-white">
                    <div className="w-full overflow-hidden rounded-lg shadow-xs">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                <thead>
                                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                                        <th className="px-4 py-3">Rol Adı</th>
                                        <th className="px-4 py-3">Düzen</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y">
                                    {roles.map((role) => (
                                        <tr className="text-gray-700" key={role.id}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center text-sm">
                                                    <div>
                                                        <p className="font-semibold">{role.rolName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center space-x-4 text-sm">
                                                    <button
                                                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                                                        aria-label="Edit"
                                                        onClick={() => handleEditRolePermissions(role.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faPen} className="w-4 h-4 text-indigo-500" />
                                                    </button>
                                                    <button
                                                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                                                        aria-label="Delete"
                                                        onClick={() => handleDeleteRole(role.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4 text-indigo-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button
                        className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700"
                        onClick={handleAddRole}
                    >
                        <FontAwesomeIcon icon={faPlus} className="w-4 h-4" /> Rol Ekle
                    </button>
                </div>
            </div>
        </div>
    );
}

function UsersSettingW() {
    return (
        <AdminLayout Content={<UsersSetting />} />
    );
}

export default UsersSettingW;
