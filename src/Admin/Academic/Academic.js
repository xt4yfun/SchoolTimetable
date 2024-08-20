import AdminLayout from "../../layouts/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faEye, faTrash, faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import { getAcademics, deleteAcademics } from '../../Api/Service/AcademicsService';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../layouts/Loading";

function AcademicData({ academicData, currentPage, itemsPerPage, fetchAcademicData }) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const studentsToDisplay = academicData.slice(startIndex, endIndex);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Akademisyen Sil',
        text: 'Bu akademisyeni silmek istediğinize emin misiniz?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sil',
        cancelButtonText: 'İptal',
      });

      if (result.isConfirmed) {
        await deleteAcademics(id);
        Swal.fire('Silindi', 'Akademisyen başarıyla silindi.', 'success');
        fetchAcademicData();
      }
    } catch (error) {
      Swal.fire('Hata', error.response?.data?.error || error.message, 'error');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Akademisyenler</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/5 py-2">Ad Soyad</th>
              <th className="w-1/5 py-2">E-posta</th>
              <th className="w-1/5 py-2">Telefon Numarası</th>
              <th className="w-1/5 py-2">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {studentsToDisplay.length > 0 ? (
              studentsToDisplay.map(academic => (
                <tr key={academic.id} className="text-center border-b">
                  <td className="py-2 truncate">{academic.firstName + " " + academic.lastName}</td>
                  <td className="py-2 truncate">{academic.eMail}</td>
                  <td className="py-2 truncate">{academic.phone}</td>
                  <td className="py-2 flex justify-around">
                    <Link to={`/Admin/Academic/${academic.id}`}><FontAwesomeIcon className="text-green-500" icon={faEye} /></Link>
                    <FontAwesomeIcon onClick={() => handleDelete(academic.id)} className="text-red-500 cursor-pointer" icon={faTrash} />
                    <Link to={`/Admin/Academic/Update/${academic.id}`}><FontAwesomeIcon className="text-yellow-500" icon={faPen} /></Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 text-center">Akademisyen bulunamadı.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Academic() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [academicData, setAcademicData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAcademicData = async () => {
    setLoading(true);
    try {
      const response = await getAcademics();
      const { data } = response.data;
      if (Array.isArray(data)) {
        setAcademicData(data);
      } else {
        setAcademicData([]);
      }
    } catch (error) {
      console.error('Error fetching academic data:', error);
      Swal.fire('Hata', error.response?.data?.error || error.message, 'error');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchAcademicData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = Array.isArray(academicData) ? academicData.filter((academic) =>
    (academic.firstName || "").toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const StudentContent = (
    <div className="p-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <Link to="/Admin/Academic/New" className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600">
              <FontAwesomeIcon icon={faPlus} /> Yeni Akademisyen
            </Link>
            <div className="flex items-center bg-white border rounded-lg shadow-md px-4 py-2">
              <FontAwesomeIcon icon={faSearch} className="text-indigo-500 mr-2" />
              <input
                type="text"
                placeholder="Ara"
                value={searchQuery}
                onChange={handleSearchChange}
                className="outline-none bg-transparent"
              />
              {searchQuery && (
                <FontAwesomeIcon icon={faTimes} onClick={() => setSearchQuery("")} className="text-gray-400 ml-2 cursor-pointer" />
              )}
            </div>
          </div>
          <AcademicData academicData={filteredStudents} currentPage={currentPage} itemsPerPage={itemsPerPage} fetchAcademicData={fetchAcademicData} />
          <div className="flex justify-center mt-4">
            {totalPages > 1 && currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Önceki
              </button>
            )}
            <span>Sayfa {currentPage} / {totalPages}</span>
            {totalPages > 1 && currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Sonraki
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );

  return (
    <AdminLayout Content={StudentContent} />
  );
}

export default Academic;
