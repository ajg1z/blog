import axios from 'axios';
import { TokenLocalStorageKey } from '../const/localStorage';

const baseURL = __API__;

export const privateApi = axios.create({
    baseURL,
    headers: {
        authorization: `Bearer ${localStorage.getItem(TokenLocalStorageKey)?.replaceAll('"', '')}`,
    },
});

export const publicApi = axios.create({
    baseURL,
});
