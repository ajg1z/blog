export enum LoginError {
    BAD_REQUEST = 400,
    INTERNAL_SERVER = 500,
}

export interface LoginSchema {
    username: string;
    password: string;
    isLoading: boolean;
    error?: LoginError;
}
