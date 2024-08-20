import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Loading from '../../layouts/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { getCourses, addCourses, deleteCourses, updateCourses } from '../../Api/Service/CoursesService';

function Course() {
  const [courseData, setcourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  //get all categories
  useEffect(() => {
    getCourses()
      .then((response) => {
        setcourseData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching data', error);
        setLoading(false);
      });
  }, []);

  //add a new course
  const AddCategory = (e) => {
    Swal.fire({
      title: 'Yeni Ders Ekle',
      html:
        '<input id="coursesName" class="swal2-input" placeholder="Ders Adı">' +
        '<input id="credit" class="swal2-input" placeholder="Kredisi">',
      showCancelButton: true,
      confirmButtonText: 'Ekle',
      showLoaderOnConfirm: true,
      cancelButtonText: 'İptal',
      preConfirm: () => {
        const coursesName = document.getElementById('coursesName').value;
        const credit = document.getElementById('credit').value;

        return addCourses({
          coursesName: coursesName,
          credit: credit,
        })
          .then((response) => {
            if (response.status === 200) {
              return response.data.data; // Return the data to be used in the then block
            }
            else {
              throw new Error('Failed to add class.');
            }
          })
          .catch((error) => {
            Swal.showValidationMessage(`Error: ${error.message}`);
            return false; // Prevent Swal from showing success message if there's an error
          });
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        Swal.fire('Ders eklendi', 'Yeni ders başarıyla eklendi', 'success');
        getCourses()
          .then((response) => {
            setcourseData(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log('Error fetching data', error);
            setLoading(false);
          });
      }
    });
  };

  // Example function to refresh the list of classes


  //dellete a course
  const DeleteCourse = (classItem) => {
    Swal.fire({
      title: 'Bu dersi silmek istediğinizden emin misiniz?',
      icon: 'warning',
      html: `<p><b>Ders Adı</b>: ${classItem.coursesName}</p> <br/>
       <p><b>Ders Kredi</b>: ${classItem.credit}</p>`,
      showCancelButton: true,
      confirmButtonText: 'Sil',
      cancelButtonText: 'İptal',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return deleteCourses(classItem.id)
          .then((response) => {
            if (response.status === 200) {
              const updatedClassData = courseData.filter((item) => item.id !== classItem.id);
              setcourseData(updatedClassData);
              return response.data;
            } else if (response.status === 400 && response.data === "Course has posts exists") {
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

  const UpdateClass = (course) => {
    Swal.fire({
      title: 'Bu dersi güncellemek istediğinizden emin misiniz?',
      icon: 'warning',
      html: `
        <div class="my-custom-dialog">
          <p><b>Ders Adı</b>: <input id="swal-input1" class="swal2-input" value="${course.coursesName}"></p>
        </div>
        <div class="my-custom-dialog">
          <p><b>Kredisi</b>: <input id="swal-input2" class="swal2-input" value="${course.credit}"></p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Güncelle',
      cancelButtonText: 'İptal',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const updatedName = document.getElementById('swal-input1').value;
        const coursesCredi = document.getElementById('swal-input2').value;
        return updateCourses({
          ID: course.id,
          CoursesName: updatedName,
          Credit: coursesCredi,
        })
          .then((response) => {
            if (response.status === 200) {
              const updatedClassData = courseData.map(item =>
                item.ID === course.ID ? { ...item, ClassName: updatedName, Credit: coursesCredi } : item
              );
              setcourseData(updatedClassData);
              return response.data;
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
        Swal.fire('Ders Güncellendi', 'Ders başarıyla güncellendi.', 'success');
        getCourses()
          .then((response) => {
            setcourseData(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log('Error fetching data', error);
            setLoading(false);
          });
      }
    });
  };

  const CourseContent = (<>
    {loading ?
      //loading style
      <Loading />
      : (
        <div
          
          className="shadow-md px-1 space-x-8 mt-2 pt-2 w-11/12 pb-2 mb-2 justify-center gap-9 rounded-lg ml-10 bg-white"
        >
          <div className="flex flex-row m-4">
            <div onClick={AddCategory} className="border bg-white text-xl rounded-lg shadow-md p-4 cursor-pointer">
              <span className="text-indigo-500 p-3">
                <FontAwesomeIcon icon={faPlus} />
              </span>{' '}
              Yeni Ders
            </div>
          </div>
          <table className="w-11/12 divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ders Adı
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ders Kredisi
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sil
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Düzenle
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courseData.map((course, index) => (
                <tr key={index}>
                  <td className="px-5 py-3 w-25 truncate w-50 block overflow-hidden overflow-ellipsis">{course.coursesName}</td>

                  <td className="px-5 py-3 max-w-sm truncate  ">{course.credit}</td>

                  <td className="px-5 py-3 " onClick={() => DeleteCourse(course)}>
                    <FontAwesomeIcon
                      className="text-indigo-500 cursor-pointer hover:text-indigo-700"
                      icon={faTrash}
                    />
                  </td>
                  <td className="px-6 py-4 " onClick={() => UpdateClass(course)}>
                    <FontAwesomeIcon
                      className="text-indigo-500 cursor-pointer hover:text-indigo-700"
                      icon={faPen}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
  </>
  );

  return <AdminLayout Content={CourseContent} />;
}

export default Course;
