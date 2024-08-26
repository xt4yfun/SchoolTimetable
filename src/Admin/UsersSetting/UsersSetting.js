import AdminLayout from '../../layouts/AdminLayout';
import { faTrashCan, faPen,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UsersSetting() {

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-center hover:text-indigo-500">Kullanıcı Rol</h2>
            <div className="grid grid-cols-3 grid-rows-1 gap-3">
                <div className="shadow-md flex-row px-1 mt-5 items-center pt-2 pb-2 mb-2 justify-center rounded-lg ml-10 bg-white">

                    <div class="w-full overflow-hidden rounded-lg shadow-xs">
                        <div class="w-full overflow-x-auto">
                            <table class="w-full whitespace-no-wrap">
                                <thead>
                                    <tr
                                        class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b  bg-gray-50 "
                                    >
                                        <th class="px-4 py-3">Rol Adı</th>
                                        <th class="px-4 py-3">Düzen</th>
                                    </tr>
                                </thead>
                                <tbody
                                    class="bg-white divide-y "
                                >
                                    <tr class="text-gray-700 ">
                                        <td class="px-4 py-3">
                                            <div class="flex items-center text-sm">

                                                <div>
                                                    <p class="font-semibold">Admin</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-4 py-3">
                                            <div class="flex items-center space-x-4 text-sm">
                                                <button
                                                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                                    aria-label="Edit"
                                                >
                                                    <FontAwesomeIcon icon={faPen} className="w-4 h-4 text-indigo-500" />
                                                </button>
                                                <button
                                                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                                                    aria-label="Delete"
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4 text-indigo-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="text-gray-700 ">
                                        <td class="px-4 py-3">
                                            <div class="flex items-center text-sm">

                                                <div>
                                                    <p class="font-semibold">Manager</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-4 py-3">
                                            <div class="flex items-center space-x-4 text-sm">
                                                <button
                                                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                                    aria-label="Edit"
                                                >
                                                    <FontAwesomeIcon icon={faPen} className="w-4 h-4 text-indigo-500" />
                                                </button>
                                                <button
                                                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                                                    aria-label="Delete"
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4 text-indigo-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="text-gray-700 ">
                                        <td class="px-4 py-3">
                                            <div class="flex items-center text-sm">

                                                <div>
                                                    <p class="font-semibold">user</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-4 py-3">
                                            <div class="flex items-center space-x-4 text-sm">
                                                <button
                                                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                                    aria-label="Edit"
                                                >
                                                    <FontAwesomeIcon icon={faPen} className="w-4 h-4 text-indigo-500" />
                                                </button>
                                                <button
                                                    class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                                                    aria-label="Delete"
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4 text-indigo-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className=" col-span-2 shadow-md flex-row px-1 mt-5 items-center pt-2 pb-2 mb-2 justify-center rounded-lg ml-10 bg-white">
                    <div class="w-full overflow-x-auto">
                        <table class="w-full whitespace-no-wrap">
                            <thead>
                                <tr
                                    class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b  bg-gray-50 "
                                >
                                    <th class="px-4 py-3">Adı Soyadı</th>
                                    <th class="px-4 py-3">E-Posta</th>
                                    <th class="px-4 py-3">Rol Adı</th>
                                    <th class="px-4 py-3">Düzen</th>
                                    <th class="px-4 py-3">Sil</th>
                                </tr>
                            </thead>
                            <tbody
                                class="bg-white divide-y "
                            >
                                <tr class="text-gray-700 ">
                                    <td class="px-4 py-3">
                                        <p class="font-semibold">Tayfun Y</p>
                                    </td>
                                    <td class="px-4 py-3">
                                        <p class="font-semibold">a@a.com</p>
                                    </td>
                                    <td class="px-4 py-3">
                                        <p class="font-semibold">Admin</p>
                                    </td>
                                    <td class="px-4 py-3">
                                        <div class="flex items-center space-x-4 text-sm">
                                            <button
                                                class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                                aria-label="Edit"
                                            >
                                                <FontAwesomeIcon icon={faPen} className="w-4 h-4 text-indigo-500" />
                                            </button>
                                            <button
                                                class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                                                aria-label="Delete"
                                            >
                                                <FontAwesomeIcon icon={faPlus} className="w-4 h-4 text-indigo-500" />
                                            </button>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3">
                                        <div class="flex items-center space-x-4 text-sm">
                                            <button
                                                class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
                                                aria-label="Delete"
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} className="w-4 h-4 text-indigo-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
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
