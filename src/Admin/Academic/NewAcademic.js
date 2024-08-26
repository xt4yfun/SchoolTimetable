import React, { useState } from 'react';
import Swal from 'sweetalert2';
import AdminLayout from '../../layouts/AdminLayout';
import { addAcademics } from '../../Api/Service/AcademicsService';

function AddAcademic() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addAcademics(formData);
      Swal.fire({
        icon: 'success',
        title: 'Akademisyen Eklendi',
        html: `
          İsim: ${formData.firstName} ${formData.lastName}<br>
          Email: ${formData.email}<br>
          Telefon: ${formData.phone}
        `,
      });
      handleClear();
    } catch (error) {
      console.error('Akademisyen eklenirken hata oluştu:', error);
      Swal.fire({
        icon: 'error',
        title: 'Akademisyen Eklenemedi',
        html: `
        Hata Mesajı: ${error.response ? error.response.data.message : 'Bir hata oluştu.'}
        `,
      });
    }
  };

  const handleClear = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
  };

  return (
    <div style={{ width: '900px' }} className="shadow-md flex-row px-1 mt-5 items-center pt-2 pb-2 mb-2 justify-center rounded-lg ml-10 bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center hover:text-indigo-500">Akademisyen Ekle</h2>
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
          <label htmlFor="phone" className="text-lg">Telefon Numarası</label>
          <input
            type="text"
            name="phone"
            className="w-full border border-gray-300 p-2 rounded"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            minLength={10}
            required
            pattern="\d*"
            inputMode="numeric"
            placeholder="Telefon Numaranızı Başında 0 olmadan yazınız"
          />
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
    <AdminLayout Content={<AddAcademic />} />
  );
}

export default Add;
