export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
}

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
