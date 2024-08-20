import React, { useState, useEffect } from 'react';
import AdminLayout from "../../layouts/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBook, faUser, faGraduationCap, faTable, faBusinessTime } from "@fortawesome/free-solid-svg-icons";
import Loading from '../../layouts/Loading';
import { getDashboard } from '../../Api/Service/StudentService';

function AnalyticsCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
      <FontAwesomeIcon icon={icon} className="text-4xl text-indigo-500" />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
    </div>
  );
}

function Dashboard() {
  const [isLoading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    TotalStudents: 0,
    TotalCourses: 0,
    TotalClass: 0,
    TotalAcademics: 0,
    Timetable: 0,
    TotalCredit: 0,
    dailyHours: 0,
    weeklyDays: 0,
    lunchBreak: false,
    lessonDuration: 0,
    breakDuration: 0,
    lunchBreakDuration: 0,
    startTime: "",
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);

      try {
        const response = await getDashboard();

        // Gelen yanıtı kontrol et ve state'i güncelle
        if (response.data.isSuccess) {
          const data = response.data.data;
          console.log("Gelen Veriler:", data);

          setDashboardData({
            TotalStudents: data.totalStudents,
            TotalCourses: data.totalCourses,
            TotalClass: data.totalClass,
            TotalAcademics: data.totalAcademic,
            Timetable: data.timetable,
            TotalCredit: data.totalCredi,
            dailyHours: data.dailyHours,
            weeklyDays: data.weeklyDays,
            lunchBreak: data.lunchBreak,
            lessonDuration: data.lessonDuration,
            breakDuration: data.breakDuration,
            lunchBreakDuration: data.lunchBreakDuration,
            startTime: data.startTime,
          });
        } else {
          console.error('Başarısız:', response?.message);
        }

      } catch (error) {
        console.error('Veri çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardContent = !isLoading ? (
    <div className="container mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnalyticsCard title="Toplam Öğrenci" value={dashboardData.TotalStudents} icon={faUser} />
        <AnalyticsCard title="Toplam Ders" value={dashboardData.TotalCourses} icon={faBook} />
        <AnalyticsCard title="Toplam Sınıf" value={dashboardData.TotalClass} icon={faUsers} />
        <AnalyticsCard title="Toplam Akademisyen" value={dashboardData.TotalAcademics} icon={faGraduationCap} />
        <AnalyticsCard title="Ders Programı" value={dashboardData.Timetable} icon={faTable} />
        <AnalyticsCard title="Haftalık Ders" value={dashboardData.TotalCredit} icon={faTable} />
      </div>
      <br></br><hr></hr><br></br>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnalyticsCard title="Günlük Ders" value={dashboardData.dailyHours} icon={faBusinessTime} />
        <AnalyticsCard title="Haftada Kaç Gün" value={dashboardData.weeklyDays} icon={faBusinessTime} />
        <AnalyticsCard title="Öğle Arası" value={dashboardData.lunchBreak ? "Var" : "Yok"} icon={faBusinessTime} />
        <AnalyticsCard title="Ders Süresi" value={`${dashboardData.lessonDuration} dk`} icon={faBusinessTime} />
        <AnalyticsCard title="Tenefüs Süresi" value={`${dashboardData.breakDuration} dk`} icon={faBusinessTime} />
        <AnalyticsCard title="Öğle Arası Süresi" value={`${dashboardData.lunchBreakDuration} dk`} icon={faBusinessTime} />
        <AnalyticsCard title="Ders Başlama Saati" value={dashboardData.startTime} icon={faBusinessTime} />
      </div>
    </div>
  ) : (
    <Loading />
  );

  return (
    <AdminLayout Content={dashboardContent} />
  );
}

export default Dashboard;
