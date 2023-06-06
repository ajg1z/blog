import { ChangeEvent, PropsWithChildren } from 'react';

import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { Profile } from '../../model/types/profileSchema';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { DesignV2ProfileCard } from '../DesignV2ProfileCard/DesignV2ProfileCard';
import { DeprecatedProfileCard } from '../DeprecatedProfileCard/DeprecatedProfileCard';

interface ProfileCardProps {
	className?: string;
	data?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly?: boolean;
	onChangeFirstName?: (e: ChangeEvent<HTMLInputElement>) => void;
	onChangeLastName?: (e: ChangeEvent<HTMLInputElement>) => void;
	onChangeAge?: (e: ChangeEvent<HTMLInputElement>) => void;
	onChangeAvatar?: (e: ChangeEvent<HTMLInputElement>) => void;
	onChangeCity?: (e: ChangeEvent<HTMLInputElement>) => void;
	onChangeUserName?: (e: ChangeEvent<HTMLInputElement>) => void;
	onChangeCurrency?: (value: Currency) => void;
	onChangeCountry?: (value: Country) => void;
}

export const ProfileCard = (props: PropsWithChildren<ProfileCardProps>) => (
	<ToggleFeatureComponent
		name='isAppRedesigned'
		on={<DesignV2ProfileCard {...props} />}
		off={<DeprecatedProfileCard {...props} />}
	/>
);
