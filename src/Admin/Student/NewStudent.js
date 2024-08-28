import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Swal from 'sweetalert2';

import {addStudent } from '../../Api/Service/StudentService';
import { getClass} from '../../Api/Service/ClassService';

function AddStudent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    classID: '',
  });

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Sınıf listesini API'den çek ve classes state'ine kaydet
    getClass()
      .then(response => {
        if (response.data.isSuccess) {
          setClasses(response.data.data);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Sınıf Bilgisi Alınamadı',
            text: response.data.message || 'Bir hata oluştu.',
          });
        }
      })
      .catch(error => {
        console.error('Sınıflar alınırken hata oluştu:', error);
        Swal.fire({
          icon: 'error',
          title: 'Sınıflar Alınamadı',
          text: error.response ? error.response.data.message : 'Bir hata oluştu.',
        });
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Öğrenci kaydetmek için POST isteği gönder
    addStudent(formData)
      .then(response => {
        // Başarılı işlem için mesaj göster
        Swal.fire({
          icon: 'success',
          title: 'Öğrenci Eklendi',
          html: `
            İsim: ${formData.firstName} ${formData.lastName}<br>
            Email: ${formData.email}<br>
            Sınıf: ${getClassname(formData.classID)}
          `,
        });
      })
      .catch(error => {
        console.error('Öğrenci eklenirken hata oluştu:', error);
        Swal.fire({
          icon: 'error',
          title: 'Öğrenci Eklenemedi',
          html: `
          Hata Mesajı: ${error.response ? error.response.data.message : 'Bir hata oluştu.'}
          `,
        });
      });

    // Formu temizle
    handleClear();
  };

  // Sınıf ismini ID ile bulma
  const getClassname = (classID) => {
    const classObj = classes.find(cls => cls.id === parseInt(classID));
    return classObj ? classObj.className : 'N/A';
  };

  const handleClear = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      classID: '',
    });
  };

  return (
    <div className="shadow-md flex-row  w-11/12  px-1 mt-5 items-center pt-2 pb-2 mb-2 justify-center rounded-lg ml-10 bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center hover:text-indigo-500">Öğrenci Ekle</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full p-1">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-lg">İsim</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-lg">Soyisim</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="classID" className="text-lg">Sınıf</label>
          <select
            id="classID"
            name="classID"
            value={formData.classID}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          >
            <option value="">Bir sınıf seçin</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>
                {cls.className}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
          Gönder
        </button>
        <button type="button" onClick={handleClear} className="bg-indigo-500 text-white py-2 px-4 rounded-lg ml-3 hover:bg-indigo-600 transition duration-300">
          Temizle
        </button>
      </form>
    </div>
  );
}

function Add() {
  return (
    <AdminLayout Content={<AddStudent />} />
  );
}

export default Add;
