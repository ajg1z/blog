import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { EditableProfileCard, profileReducer } from '@/features/EditableProfileCard';
import { Text } from '@/shared/ui/Text';
import { getUserData } from '@/entities/User';
import { PageWrapper } from '@/widgets/PageWrapper';
import { HStack } from '@/shared/ui/Stack';
import cls from './ProfilePage.module.scss';
import { ProfileRating } from '@/features/ProfileRating';
import { toggleFeature } from '@/shared/lib/featureFlags';
import { Card } from '@/shared/ui/Card';

const initialReducers: ReducersList = {
	profile: profileReducer,
};

const ProfilePage = memo(() => {
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation('profile');
	const user = useSelector(getUserData);

	if (!id) {
		return (
			<HStack justify='center' className={cls.noProfile}>
				<Text align='center' title={t('noProfile')} />
			</HStack>
		);
	}

	const isMyProfile = +id === user?.id;

	const profileRating = toggleFeature({
		name: 'isProfileRatingEnabled',
		off: () => <Card>{t('Скоро будет доступна оценка профиля!')}</Card>,
		on: () => <ProfileRating profileId={id} />,
	});

	return (
		<DynamicModuleLoader reducers={initialReducers} isRemoveAfterUnmount>
			<PageWrapper data-testid='ProfilePage'>
				<EditableProfileCard id={id} isEditable={isMyProfile} />
				{!isMyProfile && profileRating}
			</PageWrapper>
		</DynamicModuleLoader>
	);
});

export default ProfilePage;
