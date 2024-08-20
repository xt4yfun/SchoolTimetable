import AdminLayout from "../../layouts/AdminLayout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../layouts/Loading";

import {updateStudent,getStudentID } from '../../Api/Service/StudentService';
import { getClass} from '../../Api/Service/ClassService';



function GetStudent() {
  const { id } = useParams();
  const studentId = id;
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    classID: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Öğrenci verilerini almak için API çağrısı
        const studentResponse = await getStudentID(studentId);

        console.log("Öğrenci Verisi:", studentResponse.data);

        if (studentResponse.data.isSuccess && studentResponse.data.data.length > 0) {
          const student = studentResponse.data.data[0];
          setFormData({
            firstName: student.firstName || "",
            lastName: student.lastName || "",
            email: student.email || "",
            classID: student.classID ? student.classID.toString() : "", // classID'yi string olarak ayarlayın
          });
        } 

        // Sınıf verilerini almak için API çağrısı
        const classResponse = await getClass();
        console.log("Sınıf Verileri:", classResponse.data);
        setClasses(classResponse.data.data);

      } catch (error) {
        console.error("Veri alınırken bir hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.classID) {
      Swal.fire("Hata", "Sınıf seçilmelidir!", "error");
      return;
    }

    try {
      const result = await Swal.fire({
        icon: "question",
        title: "Bu öğrenciyi güncellemek istediğinizden emin misiniz?",
        html: `
          Yeni Ad: ${formData.firstName}<br>
          Yeni Soyad: ${formData.lastName}<br>
          Yeni Email: ${formData.email}<br>
          Yeni Sınıf ID: ${formData.classID}
        `,
        showCancelButton: true,
        confirmButtonText: "Evet, Güncelle",
        confirmButtonColor: "#F53D65",
      });

      if (result.isConfirmed) {
        const updateResponse = await updateStudent({
          id: studentId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          classID: parseInt(formData.classID, 10), // classID'yi integer'a çevirin
        });

        console.log("Güncelleme Yanıtı:", updateResponse.data);

        if (updateResponse.data.isSuccess) {
          Swal.fire("Güncellendi!", "", "success");
        } else {
          Swal.fire("Güncellenmedi!", "Güncelleme sırasında bir hata oluştu.", "error");
        }
      }
    } catch (error) {
      console.error("Öğrenci güncellenirken bir hata oluştu:", error);
      Swal.fire(
        "Hata",
        "Öğrenci güncellenirken bir hata oluştu, lütfen tekrar deneyin. Hata: " + (error.response?.data?.message || error.message),
        "error"
      );
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="shadow-md flex flex-col px-4 py-6 mt-5 justify-center rounded-lg bg-white w-full max-w-md mx-auto">
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Ad:
              </label>
              <input
                type="text"
                name="firstName"
                required
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Soyad:
              </label>
              <input
                type="text"
                name="lastName"
                required
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Email:
              </label>
              <input
                type="text"
                name="email"
                required
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Sınıf:
              </label>
              <select
                name="classID"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.classID}
                onChange={handleChange}
              >
                <option value="">Sınıf seçin</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.className}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-300 w-full"
            >
              Güncelle
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function UpdateStudent() {
  return <AdminLayout Content={<GetStudent />} />;
}

export default UpdateStudent;
