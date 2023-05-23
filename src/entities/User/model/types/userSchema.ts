import { FeatureFlags } from '@/shared/types/featureFlags';
import { UserRole } from '../const/userConst';

export interface User {
	id: number;
	username: string;
	avatar?: string;
	roles?: UserRole[];
	features?: FeatureFlags;
}

export interface UserSchema {
	authData?: User;
	isLoading: boolean;
}

export interface AuthResponse {
	user: User;
	token: string;
}
