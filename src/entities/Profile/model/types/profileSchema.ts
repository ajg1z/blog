import { Currency, Country } from 'shared/const/common';

export interface Profile {
    firstname: string;
    lastname: string;
    age: number;
    currency: Currency;
    city: string;
    country: Country;
    username: string;
    avatar: string;
}

export interface ProfileSchema {
    data?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
}
