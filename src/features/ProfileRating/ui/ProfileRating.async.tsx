import { lazy, Suspense } from 'react';
import { ProfileRatingProps } from './ProfileRating';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import cls from './ProfileRating.module.scss';

export const ProfileRatingLazy = lazy(() => import('./ProfileRating'));

export const ProfileRatingAsync = (props: ProfileRatingProps) => (
	<Suspense fallback={<Skeleton className={cls.RatingCard} height={120} border='5px' />}>
		<ProfileRatingLazy {...props} />
	</Suspense>
);
