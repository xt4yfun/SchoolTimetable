// import { useState } from "react";
import axios from 'axios';
// import { Navigate } from "react-router-dom";

function Domain() {
  const port = "https://localhost:44301/api";
  return port;
}

export function SetAuthToken(getauthToken) {
  sessionStorage.setItem('authToken', getauthToken); // Token'ı sessionStorage'a kaydet
} 

export function AuthToken() {
  const authToken = sessionStorage.getItem('authToken'); 
  return authToken;
}



// Sayfa kapatılmadan önce işlemler yapma
window.addEventListener("beforeunload", function (event) {
  if (event.currentTarget.location.pathname !== '/Admin') {
    event.returnValue = "Oturumunuzu kapatmak istediğinize emin misiniz?";
  } else {
    localStorage.removeItem('authToken');
  } 
});

export function Logout() {
  sessionStorage.clear();
  localStorage.removeItem('authToken');
  window.location.href = "http://localhost:3000/Login";
}

// Axios örneğini oluşturma
const api = axios.create({
  baseURL: Domain(),
});

// İsteklere token eklemek için bir interceptor ekleme
api.interceptors.request.use(
  (config) => {
    const authToken = sessionStorage.getItem('authToken'); // Token'ı sessionStorage'dan al
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
); 

// API'den veri çekmek için bir örnek fonksiyon
export async function fetchData(endpoint) {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("API'den veri çekerken bir hata oluştu:", error);
    throw error;
  }
}

export default Domain;
