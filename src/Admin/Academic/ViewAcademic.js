import { useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import Domain from "../../Api/Api";
import { AuthToken } from "../../Api/Api";
import { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../layouts/Loading";
import { getIDAcademics, deleteAcademics } from '../../Api/Service/AcademicsService';

function AcademicView() {
  const { id } = useParams();

  return (
    <AdminLayout Content={<GetAcademic academicId={id} />} />
  );
}

function GetAcademic({ academicId }) {
  const [loading, setLoading] = useState(true);
  const [academicData, setAcademicData] = useState(null);

  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        const response = await getIDAcademics(academicId);

        if (response.data && response.data.isSuccess) {
          setAcademicData(response.data.data);  // Veriyi doğru şekilde ata
        } else {
          setAcademicData(null);
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
        setAcademicData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicData();
  }, [academicId]);

  const dateFomat = (isoDate) => {
    let date = new Date(isoDate);
    let day = date.getDate();
    let month = date.toLocaleString('tr-TR', { month: 'long' });
    let year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  const handleDeleteAcademic = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Akademisyeni Sil',
        text: 'Bu akademisyeni silmek istediğinize emin misiniz?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sil',
        cancelButtonText: 'İptal',
      });

      if (result.isConfirmed) {
        await deleteAcademics(id);
        Swal.fire('Silindi', 'Akademisyen başarıyla silindi.', 'success');
        window.location.href = '/Admin/Academic';
      }
    } catch (error) {
      Swal.fire('Hata', error.response?.data?.error || error.message, 'error');
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        academicData ? (
          <div className="shadow-md flex-row px-1 items-center mt-5 pl-5 pt-2 pb-2 mb-2 justify-center rounded-lg ml-10 bg-white">
            <h1 className="mt-2 mb-2 text-2xl font-semibold">Adı: {academicData.firstName} {academicData.lastName}</h1>
            <div className="mt-2 mb-2 max-w-2xl">
              <span className="text-gray-600">Email: </span>{academicData.eMail}
            </div>
            <div className="mt-2 mb-2 max-w-2xl">
              <span className="text-gray-600">Telefon Numarası: </span>{academicData.phone}
            </div>
            <div className="mt-2 mb-2 max-w-2xl">
              <span className="text-gray-600">Oluşturulma Tarihi: </span>{dateFomat(academicData.createdDate)}
            </div>
            <button
              onClick={() => handleDeleteAcademic(academicData.id)}
              className="mt-5 bg-red-500 text-white py-2 px-4 rounded">
              Akademisyen Sil
            </button>
          </div>
        ) : (
          <div className="mt-2 mb-2 max-w-2xl text-red-500 text-lg font-bold">
            Akademisyen Bulunamadı
          </div>
        )
      )}
    </>
  );
}

export default AcademicView;
