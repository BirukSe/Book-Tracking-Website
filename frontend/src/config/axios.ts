import axios from 'axios';

const axiosinstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

export default axiosinstance;