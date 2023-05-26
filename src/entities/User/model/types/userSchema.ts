import { FeatureFlags } from '@/shared/types/featureFlags';
import { UserRole } from '../const/userConst';
import { JsonSettings } from './jsonSettings';

export interface User {
	id: number;
	username: string;
	avatar?: string;
	roles?: UserRole[];
	features?: FeatureFlags;
	jsonSettings?: JsonSettings;
}

export interface UserSchema {
	authData?: User;
	isLoading: boolean;
}

export interface AuthResponse {
	user: User;
	token: string;
}
