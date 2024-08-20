import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AdminLayout from '../../layouts/AdminLayout';
import Loading from '../../layouts/Loading';
import { getIDAcademics, updateAcademics } from '../../Api/Service/AcademicsService';

function GetAcademic() {
  const { id } = useParams();
  const academicId = id;
  const [academicData, setAcademicData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const academicResponse = await getIDAcademics(academicId);

        if (academicResponse.data.isSuccess && academicResponse.data.data) {
          setAcademicData(academicResponse.data.data);
        } else {
          setAcademicData(null);
        }
      } catch (error) {
        console.error("Veri alınırken bir hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [academicId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAcademicData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const result = await Swal.fire({
        icon: "question",
        title: "Bu akademisyeni güncellemek istediğinizden emin misiniz?",
        html: `
          Yeni Ad: ${academicData.firstName}<br>
          Yeni Soyad: ${academicData.lastName}<br>
          Yeni Email: ${academicData.eMail}<br>
          Yeni Telefon: ${academicData.phone}<br>
        `,
        showCancelButton: true,
        confirmButtonText: "Evet, Güncelle",
        confirmButtonColor: "#F53D65",
      });

      if (result.isConfirmed) {
        const updateResponse = await updateAcademics({
          id:academicId,
          firstName: academicData.firstName,
          lastName: academicData.lastName,
          eMail: academicData.eMail,
          phone: academicData.phone,
        });

        if (updateResponse.data.isSuccess) {
          Swal.fire("Güncellendi!", "", "success");
        } else {
          Swal.fire("Güncellenmedi!", "Güncelleme sırasında bir hata oluştu.", "error");
        }
      }
    } catch (error) {
      console.error("Akademisyen güncellenirken bir hata oluştu:", error);
      Swal.fire(
        "Hata",
        "Akademisyen güncellenirken bir hata oluştu, lütfen tekrar deneyin. Hata: " + (error.response?.data?.message || error.message),
        "error"
      );
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        academicData && (
          <div className="shadow-md flex flex-col px-4 py-6 mt-5 justify-center rounded-lg bg-white w-full max-w-md mx-auto">
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Ad:
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={academicData.firstName || ""}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Soyad:
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={academicData.lastName || ""}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email:
                </label>
                <input
                  type="text"
                  name="eMail"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={academicData.eMail || ""}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Telefon Numarası:
                </label>
                <input
                  type="text"
                  name="phone"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={academicData.phone || ""}
                  onChange={handleChange}
                  maxLength={10}
                  minLength={10}
                  pattern="\d*"
                  inputMode="numeric"
                  placeholder="Telefon Numarası (10 haneli)"
                  required 
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300 w-full"
              >
                Güncelle
              </button>
            </form>
          </div>
        )
      )}
    </>
  );
}

function UpdateAcademic() {
  return <AdminLayout Content={<GetAcademic />} />;
}

export default UpdateAcademic;
