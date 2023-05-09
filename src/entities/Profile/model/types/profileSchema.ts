import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

export interface Profile {
    id?: string;
    firstname?: string;
    lastname?: string;
    age?: number;
    currency?: Currency;
    city?: string;
    country?: Country;
    username?: string;
    avatar?: string;
}

export type ValidateProfileError =
    | 'InvalidUsername'
    | 'InvalidAge'
    | 'InvalidCountry'
    | 'InvalidCity'
    | 'InvalidCurrency'
    | 'InvalidFirstName'
    | 'InvalidLastName'
    | 'InvalidAvatar'
    | 'NoData'
    | 'FailUpdate';

export interface ProfileSchema {
    data?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    form?: Profile;
    validateError?: ValidateProfileError[];
}
