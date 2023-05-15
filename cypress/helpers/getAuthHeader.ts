import { TokenLocalStorageKey } from '@/shared/const/localStorage';

export const getAuthHeader = () => `Bearer ${localStorage.getItem(TokenLocalStorageKey)}`;
