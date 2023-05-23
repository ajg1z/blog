import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { BiMessageAltError } from 'react-icons/bi';
import cls from './ProfileRating.module.scss';
import { RatingCard } from '@/entities/Rating';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useProfileRating, useRateProfile } from '../api/profileRatingApi';
import { getUserData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Icon } from '@/shared/ui/Icon';

export interface ProfileRatingProps {
	className?: string;
	profileId: string;
}

const ProfileRating = memo((props: PropsWithChildren<ProfileRatingProps>) => {
	const { className, profileId } = props;
	const { t } = useTranslation('profile');

	const userData = useSelector(getUserData);
	const userId = userData?.id ?? 0;

	const { data, isError, isFetching, refetch } = useProfileRating({
		profileId,
		userId,
	});

	console.log('data', data);

	const [rateProfileMutation, rateProfileMutationResult] = useRateProfile();

	useInitialEffect(() => {
		refetch();
	});

	const handleRateProfile = useCallback(
		(startCount: number, feedback?: string) => {
			try {
				rateProfileMutation({
					rate: startCount,
					profileId,
					userId,
					feedback,
				});
			} catch (e) {
				console.log(e);
			}
		},
		[profileId, rateProfileMutation, userId],
	);

	const onCancel = useCallback(
		(startCount: number) => {
			handleRateProfile(startCount);
		},
		[handleRateProfile],
	);

	const onSendRating = useCallback(
		(startCount: number, feedback?: string) => {
			handleRateProfile(startCount, feedback);
		},
		[handleRateProfile],
	);

	if (isFetching) {
		return <Skeleton className={classNames(cls.RatingCard, {}, [className])} height={120} border='5px' />;
	}

	if (isError || rateProfileMutationResult.isError) {
		return (
			<Card className={classNames(cls.RatingCard, { [cls.error]: isError }, [className])}>
				<Text align='center' text={isError ? t('rating.errorLoading') : t('rating.errorRate')} />
				<Icon Svg={BiMessageAltError} className={cls.errorIcon} />
			</Card>
		);
	}

	const rating = data?.[0];
	const isSetRated = rating?.rate || rateProfileMutationResult.data;

	return (
		<RatingCard
			initFeedback={rating?.feedback}
			isSending={rateProfileMutationResult.isLoading}
			title={isSetRated ? t('rating.thanksForEvaluate') : t('rating.evaluate')}
			feedbackTitle={t('rating.feedbackTitle')}
			hasFeedback
			className={classNames(cls.RatingCard, {}, [className])}
			rate={rating?.rate}
			onCancel={onCancel}
			onSendRating={onSendRating}
		/>
	);
});

export default ProfileRating;
