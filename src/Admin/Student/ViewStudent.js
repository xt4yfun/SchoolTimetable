import { useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import Loading from "../../layouts/Loading";
import {deleteStudent,getStudentID } from '../../Api/Service/StudentService';

function View() {
  // URL'deki "id" parametresinin değerini al
  const { id } = useParams();

  // GetStudent bileşenini render et ve studentId'yi prop olarak geçir
  return (
    <AdminLayout Content={<GetStudent studentId={id} />} />
  );
}

function GetStudent({ studentId }) {
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await getStudentID(studentId);

        if (response.data.isSuccess && response.data.data.length > 0) {
          console.log(response.data);
          setStudentData(response.data.data[0]);
        } else {
          setStudentData(null);
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
        setStudentData(null); // Hata durumunda öğrenci verisini temizle
      } finally {
        setLoading(false); // Veri yüklenme tamamlandı
      }
    };

    fetchStudentData();
  }, [studentId]); // studentId değiştiğinde useEffect'i tekrar çalıştır

  const dateFomat = (isoDate) => {

    // Tarihi Date nesnesine çevir
    let date = new Date(isoDate);

    // Tarihi gün/ay/yıl formatında almak için
    let day = date.getDate();
    let month = date.toLocaleString('tr-TR', { month: 'long' }); // Ayı Türkçe olarak alır
    let year = date.getFullYear();

    // Formatlanmış tarihi oluştur
    return `${day} ${month} ${year}`;
  }

  const handleDeleteStudent = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Öğrenciyi Sil',
        text: 'Bu öğrenciyi silmek istediğinize emin misiniz?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sil',
        cancelButtonText: 'İptal',
      });

      if (result.isConfirmed) {
        const response = await deleteStudent(id);

        if (response.status === 200 && response.data.isSuccess) {
          Swal.fire('Silindi', 'Öğrenci başarıyla silindi.', 'success');
          setStudentData(null);
          window.location.href = '/Admin/Student';
        } else {
          throw new Error(response.data.message || 'Silme işlemi başarısız.');
        }
      }
    } catch (error) {
      Swal.fire('Hata', error.response?.data?.error || error.message, 'error');
    }
  };

  return (
    <>
      {loading ? (
        // Yükleniyor göstergesi veya mesajı  
        <Loading />
      ) : (
        studentData ? (
          <div className="shadow-md flex-row px-1 items-center mt-5 pl-5 pt-2 pb-2 mb-2 justify-center rounded-lg ml-10 bg-white">
            <h1 className="mt-2 mb-2 text-2xl font-semibold">Adı: {studentData.firstName} {studentData.lastName}</h1>
            <div className="mt-2 mb-2 max-w-2xl">
              <span className="text-gray-600">Email: </span>{studentData.email}
            </div>
            <div className="mt-2 mb-2 max-w-2xl">
              <span className="text-gray-600">Sınıf ID: </span>{studentData.classID}
            </div>
            <div className="mt-2 mb-2 max-w-2xl">
              <span className="text-gray-600">Oluşturulma Tarihi: </span>{dateFomat(studentData.createdDate)}
            </div>
            <button
              onClick={() => handleDeleteStudent(studentData.id)}
              className="mt-5 bg-red-500 text-white py-2 px-4 rounded">
              Öğrenciyi Sil
            </button>
          </div>
        ) : (
          <div className="mt-2 mb-2 max-w-2xl text-red-500 text-lg font-bold">
            Öğrenci Bulunamadı
          </div>
        )
      )}
    </>
  );
}

export default View;
