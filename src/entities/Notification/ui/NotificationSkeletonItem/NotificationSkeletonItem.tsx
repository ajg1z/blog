import { PropsWithChildren, memo } from 'react';
import { Skeleton as DeprecatedSkeleton } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as DesignV2Skeleton } from '@/shared/ui/designV2/Skeleton';
import cls from './NotificationSkeletonItem.module.scss';
import { toggleFeature } from '@/shared/lib/featureFlags';

interface NotificationSkeletonItemProps {}

export const NotificationSkeletonItem = memo((props: PropsWithChildren<NotificationSkeletonItemProps>) => {
	const Skeleton = toggleFeature({
		name: 'isAppRedesigned',
		off: () => DeprecatedSkeleton,
		on: () => DesignV2Skeleton,
	});

	return (
		<Skeleton border='5px' height='max-content' className={cls.NotificationSkeletonItem}>
			<Skeleton border='5px' height={20} className={cls.title} />
			<Skeleton border='5px' height={40} />
		</Skeleton>
	);
});
