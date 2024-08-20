import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Loading from '../../layouts/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { getCoursesClass, addCoursesClass, deleteCoursesClass, getCoursesClassID } from '../../Api/Service/CoursesClassService';
import { getClass } from '../../Api/Service/ClassService';  // Sınıf verilerini çekmek için
import { getCourses } from '../../Api/Service/CoursesService';  // Ders verilerini çekmek için

function ClassCourses() {
  const [courseData, setCourseData] = useState([]);
  const [classData, setClassData] = useState([]); // Sınıf verileri için
  const [coursesData, setCoursesData] = useState([]); // Ders verileri için
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(''); // Seçilen sınıf için
  const [totalCredits, setTotalCredits] = useState(0);

  // Verileri çekme işlemi
  useEffect(() => {
    Promise.all([getClass(), getCourses(), getCoursesClass()])
      .then(([classResponse, coursesResponse, coursesClassResponse]) => {
        setClassData(classResponse.data.data);
        setCoursesData(coursesResponse.data.data);
        setCourseData(coursesClassResponse.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching data', error);
        setLoading(false);
      });
  }, []);

  // Yeni ders ekleme işlemi
  const AddCategory = () => {
    Swal.fire({
      title: 'Yeni Ders Ekle',
      html:
        `<select id="classID" class="swal2-input">
          <option value="">Sınıf Seçin</option>
          ${classData.map(cls => `<option value="${cls.id}">${cls.className}</option>`).join('')}
        </select>` +
        `<select id="courseID" class="swal2-input">
          <option value="">Ders Seçin</option>
          ${coursesData.map(course => `<option value="${course.id}">${course.coursesName}</option>`).join('')}
        </select>`,
      showCancelButton: true,
      confirmButtonText: 'Ekle',
      showLoaderOnConfirm: true,
      cancelButtonText: 'İptal',
      preConfirm: () => {
        const classID = document.getElementById('classID').value;
        const courseID = document.getElementById('courseID').value;

        if (!classID || !courseID) {
          Swal.showValidationMessage('Lütfen tüm alanları doldurun');
          return false;
        }

        return addCoursesClass({
          classID,
          courseID,
        })
          .then((response) => {
            if (response.status === 200) {
              return response.data.data; 
            } else if (response.data.message === "Zaten atanmış bir ders") {
              Swal.showValidationMessage("Ders ve Sınıf bağlantısı var.");
            }else {
              throw new Error('Ders eklenemedi.');
            }
          })
          .catch((error) => {
            Swal.showValidationMessage(`Error: ${error.message}`);
            return false; // Hata olduğunda Swal başarılı mesaj göstermesini engellemek için false dönülüyor
          });
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        Swal.fire('Ders eklendi', 'Yeni ders başarıyla eklendi', 'success');
        getCoursesClass()
          .then((response) => {
            setCourseData(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log('Error fetching data', error);
            setLoading(false);
          });
      }
    });
  };

  // Ders silme işlemi
  const DeleteCourse = (classItem) => {
    Swal.fire({
      title: 'Bu dersi silmek istediğinizden emin misiniz?',
      icon: 'warning',
      html: `<p><b>Sınıf Adı</b>: ${classItem.className || 'Bilinmiyor'}</p>
             <p><b>Ders Adı</b>: ${classItem.coursesName || 'Bilinmiyor'}</p>
             <p><b>Ders Kredisi</b>: ${classItem.coursesCredi}</p>`,
      showCancelButton: true,
      confirmButtonText: 'Sil',
      cancelButtonText: 'İptal',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return deleteCoursesClass(classItem.id)
          .then((response) => {
            if (response.status === 200) {

              const updatedClassData = courseData.filter((item) => item.id !== classItem.id);
              setCourseData(updatedClassData);

              return response.data;

            } else if (response.status === 400 && response.data === "ClassCourses has posts exists") {
              Swal.showValidationMessage("Bu ders bağlı sınıf var.");
            } else {
              throw new Error(response.data.message.error);
            }
          })
          .catch((error) => {
            Swal.showValidationMessage(
              error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : error.message
            );
          });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Ders Silindi', 'Ders başarıyla silindi.', 'success');
      }
    });
  };

  // Sınıf seçildiğinde filtreleme işlemi
  useEffect(() => {
    if (selectedClass) {
      setLoading(true);
      getCoursesClassID(selectedClass)
        .then((response) => {
          setCourseData(response.data.data);
          const newTotal = response.data.data.reduce((sum, course) => sum + course.coursesCredi, 0);
          setTotalCredits(newTotal);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Error fetching data', error);
          setLoading(false);
        });
    } else {
      // Eğer "Tüm Sınıflar" seçilmişse tüm verileri tekrar çek
      setLoading(true);
      getCoursesClass()
        .then((response) => {
          setCourseData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Error fetching data', error);
          setLoading(false);
        });
    }
  }, [selectedClass]);
  
  const ClassContent = (<>
  {loading ? 
      //loading style
      <Loading/>
 :(
  <div
  className="shadow-md px-1 space-x-8 mt-2 pt-2 pb-2 mb-2 justify-center w-11/12 gap-9 rounded-lg ml-10 bg-white">
  <div className="flex flex-row justify-between m-4">
    <button onClick={AddCategory} className="border bg-white text-xl rounded-lg shadow-md p-4 cursor-pointer">
      <span className="text-indigo-500 p-3">
        <FontAwesomeIcon icon={faPlus} />
      </span>{' '}
      Ders Eşle
    </button>

    {selectedClass && (
        <>
          <div className="text-xl p-4">
            Toplam Kredi: {totalCredits}
          </div>
        </>
      )}

    <select
      onChange={(e) => setSelectedClass(e.target.value)}
      value={selectedClass}
      className="border bg-white text-xl rounded-lg shadow-md p-4 cursor-pointer"
    >
      <option value="">Tüm Sınıflar</option>
      {classData.map((cls) => (
        <option key={cls.id} value={cls.id}>
          {cls.className}
        </option>
      ))}
    </select>
  </div>

  <table className="w-11/12 divide-y divide-gray-200 ">
    <thead>
      <tr>
        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Sınıf Adı
        </th>
        <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Ders Adı
        </th>
        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Kredisi
        </th>
        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          İşlemler
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {courseData.map((classItem) => (
        <tr key={classItem.id}>
          <td className="px-5 py-3 max-w-sm truncate ">
            {classItem.className || 'Bilinmiyor'}
          </td>
          <td className="px-5 py-3 max-w-sm truncate ">
            {classItem.coursesName || 'Bilinmiyor'}
          </td>
          <td className="px-5 py-3 max-w-sm truncate ">
            {classItem.coursesCredi}
          </td>
          <td className="px-8 py-4 whitespace-nowrap text-sm font-medium">
            <span onClick={() => DeleteCourse(classItem)} className="text-indigo-500 cursor-pointer hover:text-indigo-700">
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  )}
</>
  );

  return <AdminLayout Content={ClassContent} />;
}

export default ClassCourses;
