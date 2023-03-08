import { User } from 'entities/User';

export interface LoginSchema {
    username: string;
    password: string;
    isLoading: boolean;
    error?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}
