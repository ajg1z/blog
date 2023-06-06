import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/designV2/Text';
import { ArticleBlockImage } from '../../../../model/types/article';
import cls from './ArticleBlockImageComponent.module.scss';
import { AppImage } from '@/shared/ui/designV2/AppImage';
import { Skeleton as DeprecatedSkeleton } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/designV2/Skeleton';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { VStack } from '@/shared/ui/designV2/Stack';

interface ArticleBlockImageComponentProps {
	className?: string;
	block: ArticleBlockImage;
}

export const ArticleBlockImageComponent: FC<ArticleBlockImageComponentProps> = memo((props) => {
	const { className, block } = props;

	return (
		<ToggleFeatureComponent
			name='isAppRedesigned'
			off={
				<VStack gap={12} className={classNames(cls.ArticleBlockImageComponent, {}, [className])} align='center'>
					<AppImage
						fallback={<DeprecatedSkeleton className={cls.image} height='100%' />}
						className={cls.image}
						src={block.src}
						alt={block.title}
					/>
					{block.title && <DeprecatedText align='center' text={block.title} />}
				</VStack>
			}
			on={
				<VStack gap={12} className={classNames(cls.ArticleBlockImageComponent, {}, [className])} align='center'>
					<AppImage
						fallback={<Skeleton className={cls.image} height='100%' />}
						className={cls.image}
						src={block.src}
						alt={block.title}
					/>
					{block.title && <Text align='center' text={block.title} />}
				</VStack>
			}
		/>
	);
});
