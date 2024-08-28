import AdminLayout from "../../layouts/AdminLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faFilter, faEye, faTrash, faPen, faTimes } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../layouts/Loading";
import { getStudent, getStudentClass, deleteStudent } from '../../Api/Service/StudentService';
import { getClass } from '../../Api/Service/ClassService';

function StudentData({ studentData, currentPage, itemsPerPage, handleDelete }) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const studentsToDisplay = studentData.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Öğrenciler</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/5 py-2">Ad Soyad</th>
              <th className="w-1/5 py-2">E-posta</th>
              <th className="w-1/5 py-2">Sınıf</th>
              <th className="w-1/5 py-2">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {studentsToDisplay.length > 0 ? (
              studentsToDisplay.map(student => (
                <tr key={student.id} className="text-center border-b">
                  <td className="py-2 truncate">{student.fullName}</td>
                  <td className="py-2 truncate">{student.email}</td>
                  <td className="py-2 truncate">{student.className}</td>
                  <td className="py-2 flex justify-around">
                    <Link to={`/Admin/Student/${student.id}`}><FontAwesomeIcon className="text-green-500" icon={faEye} /></Link>
                    <FontAwesomeIcon onClick={() => handleDelete(student.id)} className="text-red-500 cursor-pointer" icon={faTrash} />
                    <Link to={`/Admin/Student/Update/${student.id}`}><FontAwesomeIcon className="text-yellow-500" icon={faPen} /></Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 text-center">Öğrenci bulunamadı.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Student() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [studentData, setStudentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("default");
  const [classData, setClassData] = useState([]);

  const fetchStudentData = async (classID = null) => {
    setLoading(true);
    try {
      const response = classID ? await getStudentClass(classID) : await getStudent();
      const { data } = response.data;
      setStudentData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClassData = async () => {
    try {
      const response = await getClass();
      const { data } = response.data;
      setClassData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Sınıf verileri alınırken bir hata oluştu:', error);
    }
  };

  useEffect(() => {
    fetchClassData();
    fetchStudentData();
  }, []);

  useEffect(() => {
    const classID = selectedClass !== "default" ? classData.find(cls => cls.className === selectedClass)?.id : null;
    fetchStudentData(classID);
  }, [selectedClass, classData]);

  const handleDelete = async (id) => {
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
          fetchStudentData();
        } else {
          throw new Error(response.data.message || 'Silme işlemi başarısız.');
        }
      }
    } catch (error) {
      Swal.fire('Hata', error.response?.data?.error || error.message, 'error');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = studentData.filter((student) =>
    (student.fullName || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const StudentContent = (
    <div className="p-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <Link to="/Admin/Student/New" className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600">
              <FontAwesomeIcon icon={faPlus} /> Yeni Öğrenci
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
            <div className="flex items-center bg-white border rounded-lg shadow-md px-4 py-2">
              <FontAwesomeIcon icon={faFilter} className="text-indigo-500 mr-2" />
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="outline-none bg-transparent">
                <option value="default">Tüm Sınıflar</option>
                {classData.map(cls => (
                  <option key={cls.id} value={cls.className}>{cls.className}</option>
                ))}
              </select>
            </div>
          </div>
          <StudentData studentData={filteredStudents} currentPage={currentPage} itemsPerPage={itemsPerPage} handleDelete={handleDelete} />
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

export default Student;
