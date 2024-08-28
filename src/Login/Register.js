import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { register } from '../Api/Service/LoginService'; 

function Register() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Şifreler uyuşmuyor!");
            return;
        }

        try {
            const response = await register({
                firstName,
                lastName,
                email,
                password,
            });

            if (response.data.token) {
                // Token ve expiration bilgilerini sessionStorage'a kaydet
                sessionStorage.setItem('authToken', response.data.token);
                sessionStorage.setItem('tokenExpiration', response.data.expiration);

                // Başarılı kayıt sonrası kullanıcıyı giriş sayfasına yönlendir
                navigate('/Admin');
            } else {
                alert(response.message || "Kayıt başarısız.");
            }
        } catch (error) {
            console.error("Kayıt sırasında bir hata oluştu:", error);
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
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
                            alt="Office"
                        />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-4 text-xl font-semibold text-gray-700">
                                Hesap Oluştur
                            </h1>
                            <form onSubmit={handleSubmit}>
                                <label className="block text-sm">
                                    <span className="text-gray-700">Ad</span>
                                    <input
                                        className="block text-sm mt-1 p-2 border rounded w-full focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                        placeholder="Ad"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </label>
                                <label className="block text-sm">
                                    <span className="text-gray-700">Soyad</span>
                                    <input
                                        className="block text-sm mt-1 p-2 border rounded w-full focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                        placeholder="Soyad"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </label>
                                <label className="block text-sm">
                                    <span className="text-gray-700">E-Posta</span>
                                    <input
                                        className="block text-sm mt-1 p-2 border rounded w-full focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                        placeholder="a@a.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </label>
                                <label className="block mt-4 text-sm">
                                    <span className="text-gray-700">Şifre</span>
                                    <input
                                        className="block text-sm mt-1 p-2 border rounded w-full focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                        placeholder="***************"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </label>
                                <label className="block mt-4 text-sm">
                                    <span className="text-gray-700">Şifre Tekrar</span>
                                    <input
                                        className="block text-sm mt-1 p-2 border rounded w-full focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                        placeholder="***************"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </label>

                                <div className="flex mt-6 text-sm">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple"
                                            checked={acceptTerms}
                                            onChange={(e) => setAcceptTerms(e.target.checked)}
                                            required
                                        />
                                        <span className="ml-2">
                                            <span className="underline">Gizlilik politikasını </span>
                                            kabul ediyorum
                                        </span>
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                >
                                    Hesap Oluştur
                                </button>
                            </form>

                            <hr className="my-8" />

                            <p className="mt-4">
                                <button
                                    className="text-sm font-medium text-purple-600 hover:underline"
                                    onClick={() => navigate('/Login')}
                                >
                                    Zaten hesabım bulunuyor mu? Giriş Yap.
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
