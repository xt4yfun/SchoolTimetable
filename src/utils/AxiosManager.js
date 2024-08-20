import axios from 'axios';
import { AuthToken } from '../Api/Api';

class AxiosManager {
    constructor() {
        this.client = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL,
        });

        // Request interceptor
        this.client.interceptors.request.use(
            config => {
                // Bearer token'ı başlığa ekle
                if (this.token) {
                    config.headers['Authorization'] = `Bearer ${AuthToken()}`;
                }
                console.log('Request:', config);
                return config;
            },
            error => {
                console.error('Request error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.client.interceptors.response.use(
            response => {
                console.log('Response:', response);
                return response;
            },
            error => {
                console.error('Response error:', error);
                return Promise.reject(error);
            }
        );
    }

    // GET request
    get(url, config = {}) {
        return this.client.get(url, config);
    }

    // POST request
    post(url, data, config = {}) {
        return this.client.post(url, data, config);
    }

    // PUT request
    put(url, data, config = {}) {
        return this.client.put(url, data, config);
    }

    // DELETE request
    delete(url, config = {}) {
        return this.client.delete(url, config);
    }
}

export default AxiosManager;
