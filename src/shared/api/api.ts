import axios from 'axios';
import { TokenLocalStorageKey } from '../const/localStorage';

const baseURL = __API__;

export const privateApi = axios.create({
    baseURL,
});

privateApi.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(TokenLocalStorageKey)}` ?? '';
    }
    return config;
});

export const publicApi = axios.create({
    baseURL,
});
