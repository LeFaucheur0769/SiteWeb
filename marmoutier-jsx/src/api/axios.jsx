import axios from 'axios';

const instance = axios.create({
    baseURL:  'http://147.185.221.16:5808'
    // ['http://localhost:3000',
});

export default instance;