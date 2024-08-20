import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Swal from 'sweetalert2';

import {
    getAddAll,
    addTimetableClass,
    timetableDeleteAll,
    deleteClass,
    getClassList,
    getDayList,
} from '../../Api/Service/TimetableService';
import { getClass } from '../../Api/Service/ClassService';

function Timetable() {
    const [selectedClassForAssign, setSelectedClassForAssign] = useState(null);
    const [selectedTimeTable, setSelectedTimeTable] = useState('');
    const [timeTableData, setTimeTableData] = useState([]);
    const [classData, setClassData] = useState([]);
    const [dayTimeSlots, setDayTimeSlots] = useState([]); // Günün zaman dilimlerini tutmak için state

    const handleClassChange = async (classId) => {
        setSelectedTimeTable(classId);
        if (classId) {
            try {
                const response = await getClassList(classId);
                if (response.data.isSuccess) {
                    setTimeTableData(response.data.data);
                    fetchDayTimeSlots('Pazartesi'); // Pazartesi günü için zaman dilimlerini getir
                }
            } catch (error) {
                console.error("Ders programı alınırken hata oluştu", error);
            }
        } else {
            setTimeTableData([]);
        }
    };

    const fetchDayTimeSlots = async (day) => {
        try {
            const response = await getDayList(day);
            if (response.data.isSuccess) {
                const sortedTimeSlots = response.data.data.sort(
                    (a, b) => new Date(`1970-01-01T${a.startTime}`) - new Date(`1970-01-01T${b.startTime}`)
                );
                setDayTimeSlots(sortedTimeSlots);
            }
        } catch (error) {
            console.error(`${day} gününe ait zaman dilimleri alınırken hata oluştu`, error);
        }
    };

    const renderTableBody = () => {
        const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

        return days.map(day => {
            const dayData = timeTableData.filter(item => item.day === day);
            return (
                <tr key={day} className='border h-10 odd:bg-white even:bg-slate-50'>
                    <th scope="row" className="text-left">{day}</th>
                    {dayTimeSlots.map((timeSlot, index) => {
                        const classSlot = dayData.find(
                            (item) =>
                                item.startTime === timeSlot.startTime &&
                                item.endTime === timeSlot.endTime
                        );
                        return (
                            <td key={index} className="text-left text-base">
                                {classSlot ? classSlot.coursesName : '—'}
                            </td>
                        );
                    })}
                </tr>
            );
        });
    };

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await getClass();
                const { data } = response.data;
                setClassData(data);
            } catch (error) {
                console.error('Sınıf verileri alınırken bir hata oluştu:', error);
            }
        };

        fetchClassData();
    }, []);

    const validClassData = Array.isArray(classData) ? classData : [];

    const handleAssignClass = (e) => {
        e.preventDefault();
        if (!selectedClassForAssign) {
            Swal.fire({
                icon: 'warning',
                title: 'Sınıf seçilmedi',
                text: 'Lütfen bir sınıf seçin.',
            });
            return;
        }
        Swal.fire({
            title: 'Sınıfa ders programı atamak istediğinize emin misiniz?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Evet, Ata',
            cancelButtonText: 'Hayır, İptal',
        }).then((result) => {
            if (result.isConfirmed) {
                addTimetableClass(selectedClassForAssign)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Ders Programı Oluşturuldu',
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ders programı oluşurken hata oluştu',
                            text: error.response ? error.response.data.message : 'Bir hata oluştu.',
                        });
                    });
            }
        });
    };

    const handleClearStudents = (e) => {
        e.preventDefault();
        if (!selectedClassForAssign) {
            Swal.fire({
                icon: 'warning',
                title: 'Sınıf seçilmedi',
                text: 'Lütfen bir sınıf seçin.',
            });
            return;
        }
        Swal.fire({
            title: 'Seçilen sınıftaki ders programını silmek istediğinize emin misiniz?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Evet, Sil',
            cancelButtonText: 'Hayır, İptal',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteClass(selectedClassForAssign)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Seçili sınıftaki ders programı silindi',
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'İşlem gerçekleştirilemedi',
                            text: error.response ? error.response.data.message : 'Bir hata oluştu.',
                        });
                    });
            }
        });
    };

    const timeTableAddAll = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Tüm sınıflara ders programı oluşturulsun mu',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Evet, Oluştur',
            cancelButtonText: 'Hayır, İptal',
        }).then((result) => {
            if (result.isConfirmed) {
                getAddAll()
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Tüm sınıflara ders programı atandı',
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'İşlem gerçekleştirilemedi',
                            text: error.response ? error.response.data.message : 'Bir hata oluştu.',
                        });
                    });
            }
        });
    };

    const timeTableDeleteAll = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Tüm sınıflara ders programı silinsin mi',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Evet, Sil',
            cancelButtonText: 'Hayır, İptal',
        }).then((result) => {
            if (result.isConfirmed) {
                timetableDeleteAll()
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Tüm sınıflara ders programı silindi',
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'İşlem gerçekleştirilemedi',
                            text: error.response ? error.response.data.message : 'Bir hata oluştu.',
                        });
                    });
            }
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-center hover:text-indigo-500">Ders Programı</h2>
            <form className="space-y-4 w-full p-1">
                <div className="shadow-md flex-row px-1 mt-5 items-center pt-2 pb-2 mb-2 justify-center rounded-lg ml-10 bg-white">
                    <div className="grid grid-cols-12 gap-12">
                        <div className="col-span-6 ml-2 sm:col-span-6">
                            <label htmlFor="dailyHours" className="block mb-2 text-sm font-medium text-gray-900">Sınıfa Özel</label>
                            <select
                                value={selectedClassForAssign || ''}
                                onChange={(e) => setSelectedClassForAssign(e.target.value)}
                                className="outline-none bg-transparent w-52 bg-white border rounded-lg px-4 py-2"
                            >
                                <option value="">Seçiniz..</option>
                                {validClassData.map(cls => (
                                    <option key={cls.id} value={cls.id}>{cls.className}</option>
                                ))}
                            </select>
                            <button onClick={handleAssignClass} className="bg-indigo-500 ml-2 mt-2 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
                                Programı Ata
                            </button>
                            <button onClick={handleClearStudents} className="bg-indigo-500 ml-2 mt-2 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
                                Programını Sil
                            </button>
                        </div>
                        <div className="col-span-6 sm:col-span-6">
                           
                        <label htmlFor="dailyHours" className="block mb-2 text-sm font-medium text-gray-900">Tüm Sınıf</label>
                            <button onClick={timeTableAddAll} className="bg-indigo-500 mt-2 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
                                Tüm sınıfların Programını Ata
                            </button>
                            <button onClick={timeTableDeleteAll} className="bg-indigo-500 ml-2 mt-2 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
                                Tüm sınıfların Programını Sil
                            </button>
                        </div>
                    </div>
                </div>
                <div className="shadow-md flex-row px-1 mt-5 items-center pt-2 pb-2 justify-center rounded-lg ml-10 bg-white">
                    <select
                        value={selectedTimeTable}
                        onChange={(e) => handleClassChange(e.target.value)}
                        className="outline-none bg-transparent w-56 bg-white border rounded-lg px-4 py-2"
                    >
                        <option value="">Seçiniz..</option>
                        {validClassData.map(cls => (
                            <option key={cls.id} value={cls.id}>{cls.className}</option>
                        ))}
                    </select>
                    <table className="border shadow-md w-full ml-0 mr-1 mt-5 mb-5 text-base">
                        <thead>
                            <tr className='border odd:bg-white even:bg-slate-50'>
                                <th scope="col" className="text-left text-lg">Gün</th>
                                {dayTimeSlots.map((timeSlot, index) => (
                                    <th key={index}  className="text-left">
                                        {`${timeSlot.startTime} - ${timeSlot.endTime}`}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 ">
                            {renderTableBody()}
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    );
}

function TimetableW() {
    return (
        <AdminLayout Content={<Timetable />} />
    );
}

export default TimetableW;
