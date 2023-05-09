import { UserRole } from '../const/userConst';

export interface User {
    id: number;
    username: string;
    avatar?: string;
    roles?: UserRole[];
}

export interface UserSchema {
    authData?: User;
    isLoading: boolean;
}

export interface AuthResponse {
    user: User;
    token: string;
}
