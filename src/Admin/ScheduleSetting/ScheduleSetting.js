import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Swal from 'sweetalert2';
import { getScheduleSettingID, updateScheduleSetting } from '../../Api/Service/ScheduleSettingService';

function ScheduleSetting() {
    const [formData, setFormData] = useState({
        dailyHours: 0,
        weeklyDays: 0,
        lunchBreak: false,
        lessonDuration: 0,
        breakDuration: 0,
        lunchBreakDuration: 0,
        startTime: '00:00:00',
    });

    useEffect(() => {
        // Fetch the schedule settings when the component mounts
        getScheduleSettingID()
            .then(response => {
                const data = response.data.data;
                setFormData({
                    dailyHours: data.dailyHours,
                    weeklyDays: data.weeklyDays,
                    lunchBreak: data.lunchBreak,
                    lessonDuration: data.lessonDuration,
                    breakDuration: data.breakDuration,
                    lunchBreakDuration: data.lunchBreakDuration,
                    startTime: data.startTime,
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Veri alınamadı',
                    text: 'Ders ayarları alınırken bir hata oluştu.',
                });
            });
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update schedule settings
        updateScheduleSetting(formData)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Ders ayarları güncellendi',
                    html: `
                    Günlük Ders: ${formData.dailyHours}<br>
                    Haftada Gün: ${formData.weeklyDays}<br>
                    Öğle Arası: ${formData.lunchBreak ? 'Evet' : 'Hayır'}<br>
                    Ders Süresi: ${formData.lessonDuration}<br>
                    Tenefüs Süresi: ${formData.breakDuration}<br>
                    Öğle Arası Süresi: ${formData.lunchBreakDuration}<br>
                    Ders Başlangıç Süresi: ${formData.startTime}
                    `,
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Ayar değiştirilemedi',
                    text: error.response ? error.response.data.message : 'Bir hata oluştu.',
                });
            });
    };

    return (
        <div className="shadow-md flex-row px-1 w-11/12 mt-5 items-center pt-2 pb-2 mb-2 justify-center rounded-lg ml-10 bg-white">
            <h2 className="text-2xl font-semibold mb-4 text-center hover:text-indigo-500">Ders Program Ayarı</h2>
            <form onSubmit={handleSubmit} className="space-y-4 w-full p-1">
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-2 sm:col-span-2">
                        <label htmlFor="dailyHours" className="block mb-2 text-sm font-medium text-gray-900">Günde Kaç Ders</label>
                        <input
                            type="number"
                            id="dailyHours"
                            name="dailyHours"
                            min="1"
                            max="10"
                            step="1"
                            value={formData.dailyHours}
                            onChange={handleChange}
                            required
                            className="border rounded-lg p-2"
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-2">
                        <label htmlFor="weeklyDays" className="block mb-2 text-sm font-medium text-gray-900">Haftada Kaç Gün</label>
                        <input
                            type="number"
                            id="weeklyDays"
                            name="weeklyDays"
                            min="1"
                            max="7"
                            step="1"
                            value={formData.weeklyDays}
                            onChange={handleChange}
                            required
                            className="border rounded-lg p-2"
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-2">
                        <label htmlFor="lunchBreak" className="block mb-2 text-sm font-medium text-gray-900">Öğle Arası</label>
                        <label>
                            <input
                                type="checkbox"
                                id="lunchBreak"
                                name="lunchBreak"
                                checked={formData.lunchBreak}
                                onChange={handleChange}
                                className="accent-indigo-500"
                            /> Öğle Arası
                        </label>
                    </div>
                    <div className="col-span-2 sm:col-span-2">
                        <label htmlFor="lessonDuration" className="block mb-2 text-sm font-medium text-gray-900">Ders Süresi</label>
                        <input
                            type="number"
                            id="lessonDuration"
                            name="lessonDuration"
                            min="1"
                            max="7"
                            step="1"
                            value={formData.lessonDuration}
                            onChange={handleChange}
                            required
                            className="border rounded-lg p-2"
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-2">
                        <label htmlFor="breakDuration" className="block mb-2 text-sm font-medium text-gray-900">Tenefüs Süresi</label>
                        <input
                            type="number"
                            id="breakDuration"
                            name="breakDuration"
                            min="0"
                            max="60"
                            step="5"
                            value={formData.breakDuration}
                            onChange={handleChange}
                            required
                            className="border rounded-lg p-2"
                        />
                    </div>
                    <div className="col-span-2 sm:col-span-2">
                        <label htmlFor="lunchBreakDuration" className="block mb-2 text-sm font-medium text-gray-900">Öğle Arası</label>
                        <input
                            type="number"
                            id="lunchBreakDuration"
                            name="lunchBreakDuration"
                            min="0"
                            max="60"
                            step="5"
                            value={formData.lunchBreakDuration}
                            onChange={handleChange}
                            required
                            className="border rounded-lg p-2"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-6 sm:col-span-6">
                        <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-900">Ders Başlangıç Süresi</label>
                        <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            required
                            className="bg-gray-50 p-2 border leading-none border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-6">
                        <br></br>
                        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
                            Güncelle
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function scheduleSettingV() {
    return (
        <AdminLayout Content={<ScheduleSetting />} />
    );
}

export default scheduleSettingV;