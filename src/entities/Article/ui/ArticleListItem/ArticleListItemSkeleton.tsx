import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as DeprecatedCard } from '@/shared/ui/deprecated/Card';
import { Card as DesignV2Card } from '@/shared/ui/designV2/Card';
import { Skeleton as DeprecatedSkeleton } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as DesignV2Skeleton } from '@/shared/ui/designV2/Skeleton';
import { HStack, VStack } from '@/shared/ui/designV2/Stack';
import { ArticleView } from '../../model/const/articleConst';
import cls from './ArticleListItem.module.scss';
import { toggleFeature } from '@/shared/lib/featureFlags';
// eslint-disable-next-line max-len

interface ArticleListItemProps {
	className?: string;
	view: ArticleView;
}

export const ArticleListItemSkeleton: FC<ArticleListItemProps> = memo((props) => {
	const { className, view } = props;

	const Skeleton = toggleFeature({
		name: 'isAppRedesigned',
		off: () => DeprecatedSkeleton,
		on: () => DesignV2Skeleton,
	});

	const Card = toggleFeature({
		name: 'isAppRedesigned',
		off: () => DeprecatedCard,
		on: () => DesignV2Card,
	});

	if (view === ArticleView.TILE) {
		return (
			<div
				data-testid='ArticleListItemSkeleton'
				className={classNames(cls.ArticleListItem, {}, [cls.TAIL, className])}
			>
				<Card className={cls.card}>
					<div className={cls.imgWrapper}>
						<Skeleton height={200} />
					</div>
					<div className={cls.articleInfo}>
						<Skeleton width={150} height={20} />
					</div>
					<Skeleton width={240} height={20} />
				</Card>
			</div>
		);
	}

	return (
		<div
			data-testid='ArticleListItemSkeleton'
			className={classNames(cls.ArticleListItem, {}, [className, cls.LIST])}
		>
			<Card className={cls.card}>
				<VStack gap={8} className={classNames(cls.header, cls.skeletonHeader)}>
					<Skeleton border='50%' height={30} width={30} />
					<Skeleton height={20} width={130} />
					<Skeleton height={20} width={130} className={cls.createdAt} />
				</VStack>

				<Skeleton height={25} width={330} className={cls.articleTitle} />

				<HStack gap={12} className={cls.skeletonTypes}>
					<Skeleton height={20} width={40} className={cls.articleTitle} />
					<Skeleton height={20} width={40} className={cls.articleTitle} />
				</HStack>

				<Skeleton height={200} className={classNames(cls.img, {}, [cls.skeletonImg])} />

				<Skeleton height={80} className={cls.skeletonDescription} />
				<Skeleton height={50} className={cls.skeletonDescription} />
				<div className={cls.footer}>
					<Skeleton height={25} width={80} />
				</div>
			</Card>
		</div>
	);
});
