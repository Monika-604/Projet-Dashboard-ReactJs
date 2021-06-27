import axios from 'axios';
import { toast } from 'react-toastify';
import { HOST} from './config'

axios.defaults.baseURL = HOST;

axios.interceptors.request.use(
    config => {
        const token = window.localStorage.getItem('jwt');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!')
    }
    if (error.response){
        const { status, data, config } = error.response;
        if (status) {
            if (status === 401) {
                toast.error(data.message)
                if (data.error && data.error.phone) {
                    toast.error(data.error.phone[0])
                }
                return error
            }
            if (status === 404) {
                // history.push('/notfound')
            }
            if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
                // history.push('/notfound')
            }
            if (status === 500) {
                toast.error('Server error - check the terminal for more info!')
            }
        }
    }


    throw error.response;
})

const responseBody = (response) => response.data;
const errorBody = (error) => error.data;
const sleep = (ms) => (response) =>
    new Promise(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url) => axios.get(url).then(sleep(1)).then(responseBody),
    post: (url, body) => axios.post(url, body).then(sleep(1)).then(responseBody).catch(errorBody),
    put: (url, body) => axios.put(url, body).then(sleep(1)).then(responseBody).catch(errorBody),
    del: (url) => axios.delete(url).then(sleep(1)).then(responseBody),
    postForm: (url, file) => {
        let formData = new FormData();
        formData.append('image', file);
        return axios
            .post(url, formData, {
                headers: { 'Content-type': 'multipart/form-data' }
            })
            .then(responseBody);
    }
};


const User = {
    rainfall: (city) => requests.get(`/services/weather/rainfall/${city}`),
    climate: (city) => requests.get(`/services/weather/climate/${city}`),
    temperature: (city) => requests.get(`/services/weather/temperature/${city}`),
    crypto: () => requests.get(`/services/exchange/crypto`),
    fiat: () => requests.get(`/services/exchange/fiat`),
    widgets: () => requests.get(`/user-widgets`),
}


export default {
    User
}