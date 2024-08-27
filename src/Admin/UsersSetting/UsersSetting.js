import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { faTrashCan, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addRole, deleteRole, getAll } from '../../Api/Service/RoleService';
import { addRoleUser, deleteRoleUser, getRoleUserId, RolegetUser } from '../../Api/Service/RoleUserService';
import { PermgetRole, addPermRole, deletePermRole, getId } from '../../Api/Service/PermissionRoleService';
import { getAllPerm } from '../../Api/Service/PermissionService';
import { getAllUser, deleteUser, updateUser } from '../../Api/Service/UserService';
import Swal from 'sweetalert2';

function UsersSetting() {
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadRoles();
        loadUsers();
    }, []);

    const loadRoles = async () => {
        try {
            const response = await getAll();
            setRoles(response.data.data);
        } catch (error) {
            console.error("Rol listesi alınırken hata oluştu:", error);
        }
    };

    const loadUsers = async () => {
        try {
            const response = await getAllUser();
            setUsers(response.data.data); // Set user data
        } catch (error) {
            console.error("Kullanıcı listesi alınırken hata oluştu:", error);
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
            // Tüm izinleri API'den çek
            const allPerms = (await getAllPerm()).data;

            // Role ait izinleri API'den çek
            const rolePerms = (await PermgetRole(roleId)).data;

            // Role atanmış izinlerin ID'lerini çıkar
            const rolePermissionIds = rolePerms.data.map(perm => perm.permissonId.toString());

            // HTML formunu oluştur
            const formHtml = allPerms.data.map(perm => `
                <div>
                    <input type="checkbox" id="perm-${perm.id}" name="permissions" value="${perm.id}"
                    ${rolePermissionIds.includes(perm.id.toString()) ? 'checked' : ''}>
                    <label for="perm-${perm.id}">${perm.name}</label>
                </div>
            `).join('');

            const { value: formValues } = await Swal.fire({
                title: 'İzinleri Düzenle',
                html: `<form id="permissions-form">${formHtml}</form>`,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Güncelle',
                cancelButtonText: 'İptal',
                preConfirm: () => {
                    const checkedBoxes = document.querySelectorAll('#permissions-form input[name="permissions"]:checked');
                    return Array.from(checkedBoxes).map(cb => cb.value);
                }
            });

            if (formValues) {
                // Seçilen izinleri ekleme/silme işlemleri
                for (const perm of allPerms.data) {
                    const isChecked = formValues.includes(perm.id.toString());
                    const wasChecked = rolePermissionIds.includes(perm.id.toString());

                    if (isChecked && !wasChecked) {
                        // Yeni seçilen izinleri ekle
                        await addPermRole({ RoleID: roleId, PermissonID: perm.id });
                    } else if (!isChecked && wasChecked) {
                        // Seçimden kaldırılan izinleri sil
                        const allPR = await getId(roleId, perm.id);
                        if (allPR.data.data && allPR.data.data.id) {
                            await deletePermRole(allPR.data.data.id);
                        } else {
                            console.error("Expected permission role data not found:", allPR);
                        }
                    }
                }

                Swal.fire('Başarılı!', 'İzinler başarıyla güncellendi.', 'success');
                loadRoles(); // Roller güncellendiğinde yeniden yükle
            }
        } catch (error) {
            console.error("İzinler güncellenirken hata oluştu:", error);
            Swal.fire('Hata!', 'İzinler güncellenirken bir hata oluştu.', 'error');
        }
    };

    const handleEditRoleUser = async (userId) => {
        try {
            // Tüm rolleri API'den çek
            const allRoles = (await getAll()).data;

            // Kullanıcıya atanmış rolleri API'den çek
            const userRoles = (await RolegetUser(userId)).data;

            // Kullanıcıya atanmış rollerin ID'lerini çıkar
            const userRoleIds = userRoles.data.map(role => role.roleID.toString());

            // HTML formunu oluştur
            const formHtml = allRoles.data.map(role => `
                <div>
                    <input type="checkbox" id="role-${role.id}" name="roles" value="${role.id}"
                    ${userRoleIds.includes(role.id.toString()) ? 'checked' : ''}>
                    <label for="role-${role.id}">${role.rolName}</label>
                </div>
            `).join('');

            const { value: formValues } = await Swal.fire({
                title: 'Rolleri Düzenle',
                html: `<form id="roles-form">${formHtml}</form>`,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Güncelle',
                cancelButtonText: 'İptal',
                preConfirm: () => {
                    const checkedBoxes = document.querySelectorAll('#roles-form input[name="roles"]:checked');
                    return Array.from(checkedBoxes).map(cb => cb.value);
                }
            });

            if (formValues) {
                // Seçilen rolleri ekleme/silme işlemleri
                for (const role of allRoles.data) {
                    const isChecked = formValues.includes(role.id.toString());
                    const wasChecked = userRoleIds.includes(role.id.toString());

                    if (isChecked && !wasChecked) {
                        // Yeni seçilen rolleri ekle
                        await addRoleUser({ userId: userId, roleId: role.id });
                    } else if (!isChecked && wasChecked) {
                        // Seçimden kaldırılan rolleri sil
                        const userRole = await getRoleUserId(role.id, userId);
                        if (userRole.data.data && userRole.data.data.id) {
                            await deleteRoleUser(userRole.data.data.id);
                        } else {
                            console.error("Beklenen kullanıcı rolü verisi bulunamadı:", userRole);
                        }
                    }
                }

                Swal.fire('Başarılı!', 'Roller başarıyla güncellendi.', 'success');
                loadUsers(); // Kullanıcılar güncellendiğinde yeniden yükle
            }
        } catch (error) {
            console.error("Roller güncellenirken hata oluştu:", error);
            Swal.fire('Hata!', 'Roller güncellenirken bir hata oluştu.', 'error');
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

    const handleDeleteUser = async (userId) => {
        const result = await Swal.fire({
            title: 'Kullanıcıyı silmek istediğinize emin misiniz?',
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
                await deleteUser(userId);
                Swal.fire('Silindi!', 'Kullanıcı başarıyla silindi.', 'success');
                loadUsers(); // Kullanıcılar silindikten sonra yeniden yüklenir
            } catch (error) {
                console.error("Kullanıcı silinirken hata oluştu:", error);
                Swal.fire('Hata!', 'Kullanıcı silinirken bir hata oluştu.', 'error');
            }
        }
    };

    const handleEditUser = async (user) => {
        const { value: formValues } = await Swal.fire({
            title: 'Kullanıcı Bilgilerini Düzenle',
            html: `
                <div>
                    <label for="first-name">Adı:</label>
                    <input type="text" id="first-name" class="swal2-input" value="${user.firstName}">
                </div>
                <div>
                    <label for="last-name">Soyadı:</label>
                    <input type="text" id="last-name" class="swal2-input" value="${user.lastName}">
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" class="swal2-input" value="${user.eMail}">
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Güncelle',
            cancelButtonText: 'İptal',
            preConfirm: () => {
                return {
                    firstName: document.getElementById('first-name').value,
                    lastName: document.getElementById('last-name').value,
                    email: document.getElementById('email').value,
                };
            }
        });

        if (formValues) {
            try {
                const updatedUser = {
                    ID: user.id,
                    FirstName: formValues.firstName,
                    LastName: formValues.lastName,
                    Email: formValues.email,
                };

                // API çağrısını burada yapabilirsiniz
                await updateUser(updatedUser);

                Swal.fire('Başarılı!', 'Kullanıcı bilgileri başarıyla güncellendi.', 'success');
                loadUsers(); // Kullanıcılar güncellendikten sonra yeniden yüklenir
            } catch (error) {
                console.error("Kullanıcı güncellenirken hata oluştu:", error);
                Swal.fire('Hata!', 'Kullanıcı güncellenirken bir hata oluştu.', 'error');
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
                <div className="col-span-2 shadow-md flex-row px-1 mt-5 items-center pt-2 pb-2 mb-2 justify-center rounded-lg ml-10 bg-white">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                                    <th className="px-4 py-3">Adı</th>
                                    <th className="px-4 py-3">Soyadı</th>
                                    <th className="px-4 py-3">E-Posta</th>
                                    <th className="px-4 py-3">Rol Adı</th>
                                    <th className="px-4 py-3">Düzen</th>
                                    <th className="px-4 py-3">Sil</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y">
                                {users.map((user) => (
                                    <tr className="text-gray-700" key={user.id}>
                                        <td className="px-4 py-3">
                                            <p className="font-semibold">{user.firstName}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="font-semibold">{user.lastName}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="font-semibold">{user.eMail}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="font-semibold">{user.rolName}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center space-x-4 text-sm">
                                                <button
                                                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                                                    aria-label="Edit"
                                                    onClick={() => handleEditRoleUser(user.id)}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} className="w-4 h-4 text-indigo-500" />
                                                </button>
                                                <button
                                                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                                                    aria-label="Edit"
                                                    onClick={() => handleEditUser(user)} // Burada onClick ile handleEditUser fonksiyonunu çağırıyoruz
                                                >
                                                    <FontAwesomeIcon icon={faPen} className="w-4 h-4 text-indigo-500" />
                                                </button>

                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center space-x-4 text-sm">
                                                <button
                                                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                                                    aria-label="Delete"
                                                    onClick={() => handleDeleteUser(user.id)} // Buraya onClick ekledik
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
