import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login } from '../Api/Service/LoginService'; 

function Login() {
  const [email, setEmail] = useState(""); // Email giriş kısmı
  const [password, setPassword] = useState(""); // Şifre giriş kısmı
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Eğer authToken varsa, doğrudan /Admin sayfasına yönlendir
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      window.location.href = '/Admin';
    }
  }, [navigate]);

  const handleClick = (event) => {
    event.preventDefault(); // Sayfa yenilemesini engelle
    navigate('/Register');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password });
      const authToken = response.data.token;

      // Token'ı sessionStorage'a kaydet
      sessionStorage.setItem('authToken', authToken);

      // Başarılı giriş sonrası /Admin sayfasına yönlendir
      window.location.href = '/Admin';
      setError(null);
    } catch (error) {
      setError("Giriş başarısız. Lütfen giriş bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              className="object-cover w-full h-full"
              src="https://i.pinimg.com/564x/8f/d0/d0/8fd0d0b7dd22f61d9f7aa5132cc4fbd7.jpg"
              alt=""
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700">
                Giriş Yap
              </h1>
              <form onSubmit={handleLogin}>
                <label className="block text-sm">
                  <span className="text-gray-700">E Posta</span>
                  <input
                    className="block text-sm mt-1 p-2 border rounded w-full focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                    placeholder="a@a.com"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label className="block mt-4 text-sm">
                  <span className="text-gray-700">Şifre</span>
                  <input
                    className="block text-sm mt-1 p-2 border rounded w-full focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                    placeholder="***************"
                    required
                    name="password"
                    id="password"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                  className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  type="submit"
                >
                  Giriş Yap
                </button>
              </form>
              <hr className="my-8" />
              <p className="mt-1">
                <button 
                  className="text-sm font-medium text-purple-600"
                  onClick={handleClick}
                >
                  Hesap Oluştur
                </button>
              </p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
