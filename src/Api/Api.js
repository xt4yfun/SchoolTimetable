import axios from 'axios';

// API'nin base URL'sini döndüren fonksiyon
function Domain() {
  return "https://localhost:44301/api";
}

// Token'ı sessionStorage'a kaydetmek için fonksiyon
export function SetAuthToken(getauthToken) {
  sessionStorage.setItem('authToken', getauthToken);
}

// Token'ı sessionStorage'dan almak için fonksiyon
export function AuthToken() {
  return sessionStorage.getItem('authToken');
}

// Çıkış yapma işlemi için fonksiyon
export function Logout() {
  sessionStorage.clear();
  localStorage.removeItem('authToken'); // localStorage'dan authToken'ı temizle
  window.location.href = "http://localhost:3000/Login"; // Yönlendirme
}

// Axios örneğini oluşturma
const api = axios.create({
  baseURL: Domain(),
});

// İsteklere token eklemek için interceptor
api.interceptors.request.use(
  (config) => {
    const authToken = AuthToken(); // Token'ı AuthToken fonksiyonundan al
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API'den veri çekmek için örnek fonksiyon
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
