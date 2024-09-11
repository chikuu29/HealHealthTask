import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { RootState, store } from '../store';
// import { useSelector } from 'react-redux';


// const BASE_URL = import.meta.env.VITE_API_END_POINT;
// const BASE_URL = import.meta.env.VITE_API_END_POINT;
// const BASE_URL='/api'
console.log("%c"+`===🎉${import.meta.env.MODE.toUpperCase()}🎉MODE ACTIVE=== `,"color:green");

const BASE_URL = import.meta.env.DEV?'/api':import.meta.env.VITE_API_URL;
// const BASE_URL = '/api';
const privateAPI = axios.create({
    baseURL: BASE_URL,
    withCredentials:true,
    headers:{
        'X-Requested-From':'LOCAL_BASELINE'
    }
    // timeout: 10000

})

const publicAPI  = axios.create({
    baseURL: BASE_URL,
    // timeout: 10000,
    withCredentials:true,
    headers:{
        'X-Requested-From':'LOCAL_BASELINE'
    }

})
// Request interceptor to add Authorization header
privateAPI.interceptors.request.use(

    (config) => {
        const authState:RootState=store.getState()
        if (authState && authState.auth && authState.auth.isAuthenticated) {
            const {token} = authState.auth
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }

);

// Response interceptor to handle 401 errors and refresh token
privateAPI.interceptors.response.use(

    (response: AxiosResponse) => {
        return response
    },
    (error: AxiosError) => {
        const { config, response } = error
        const originalRequest: any = config;

        if (error?.response?.status === 403 && !originalRequest?.sent) {
            originalRequest.sent = true;
            // const newAccessToken = await refresh();
            const newAccessToken="newtoken_"+Math.random()
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return privateAPI(originalRequest);
        }
        return Promise.reject(error)
    }

)


export { privateAPI,publicAPI };