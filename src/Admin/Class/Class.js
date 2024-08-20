import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Loading from '../../layouts/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { deleteClass, getClass, addClass, updateClass } from '../../Api/Service/ClassService';

function Class() {
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  //get all categories
  useEffect(() => {
    getClass()
      .then((response) => {
        setClassData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching data', error);
        setLoading(false);
      });
  }, []);




  //add a new classs
  const AddCategory = (e) => {
    Swal.fire({
      title: 'Yeni Sınıf Ekle',
      html:
        '<input id="Class" class="swal2-input" placeholder="Sınıf Adı">' +
        '<input id="ClassName" class="swal2-input" placeholder="Şubesi">',
      showCancelButton: true,
      confirmButtonText: 'Ekle',
      showLoaderOnConfirm: true,
      cancelButtonText: 'İptal',
      preConfirm: () => {
        const classname = document.getElementById('Class').value + "-" + document.getElementById('ClassName').value.toUpperCase();

        return addClass(
          {
            className: classname
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
        Swal.fire('Sınıf eklendi', 'Yeni sınıf başarıyla eklendi', 'success');
        getClass()
          .then((response) => {
            setClassData(response.data.data);
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


  //dellete a classs
  const DeleteClass = (classItem) => {
    Swal.fire({
      title: 'Bu sınıfı silmek istediğinizden emin misiniz?',
      icon: 'warning',
      html: `<p><b>Sınıf Adı</b>: ${classItem.className}</p>`,
      showCancelButton: true,
      confirmButtonText: 'Sil',
      cancelButtonText: 'İptal',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return deleteClass(classItem.id)
          .then((response) => {
            if (response.status === 200) {
              const updatedClassData = classData.filter((item) => item.id !== classItem.id);
              setClassData(updatedClassData);
              return response.data;
            } else if (response.status === 400 && response.data === "Class has posts exists") {
              Swal.showValidationMessage("Bu sınıfa bağlı gönderiler var.");
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
        Swal.fire('Sınıf Silindi', 'Sınıf başarıyla silindi.', 'success');
      }
    });
  };

  const UpdateClass = (classs) => {
    Swal.fire({
      title: 'Bu sınıfı güncellemek istediğinizden emin misiniz?',
      icon: 'warning',
      html: `
        <div class="my-custom-dialog">
          <p><b>Sınıf Adı</b>: <input id="swal-input1" class="swal2-input" value="${classs.className}"></p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Güncelle',
      cancelButtonText: 'İptal',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const updatedName = document.getElementById('swal-input1').value.toUpperCase();

        return updateClass({
          id: classs.id,
          className: updatedName,
        })
          .then((response) => {
            if (response.status === 200) {
              const updatedClassData = classData.map(item =>
                item.id === classs.id ? { ...item, className: updatedName } : item
              );
              setClassData(updatedClassData);
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
        Swal.fire('Sınıf Güncellendi', 'Sınıf başarıyla güncellendi.', 'success');
      }
    });
  };

  const ClassContent = (<>
    {loading ?
      //loading style
      <Loading />
      : (
        <div
          className="shadow-md px-1 space-x-8 mt-2 pt-2 pb-2 mb-2 w-11/12 justify-center gap-9 rounded-lg ml-10 bg-white"
        >
          <div className="flex flex-row m-4">
            <div onClick={AddCategory} className="border bg-white text-xl rounded-lg shadow-md p-4 cursor-pointer">
              <span className="text-indigo-500 p-3">
                <FontAwesomeIcon icon={faPlus} />
              </span>{' '}
              Yeni Sınıf
            </div>
          </div>
          <table className="w-11/12 divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sınıf Adı
                </th>
                <th className=" text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sil
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Düzenle
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classData.map((classs, index) => (
                <tr key={index}>
                  <td className="w-25 truncate w-40 block overflow-hidden overflow-ellipsis">{classs.className}</td>
                  <td className="" onClick={() => DeleteClass(classs)}>
                    <FontAwesomeIcon
                      className="text-indigo-500 cursor-pointer hover:text-indigo-700"
                      icon={faTrash}
                    />
                  </td>
                  <td className="px-6 py-4 " onClick={() => UpdateClass(classs)}>
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

  return <AdminLayout Content={ClassContent} />;
}

export default Class;
