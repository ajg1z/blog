import { FC, HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Text } from '@/shared/ui/deprecated/Text';
import EyeIcon from '@/shared/assets/img/eye.svg';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button } from '@/shared/ui/deprecated/Button';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { HStack } from '@/shared/ui/designV2/Stack';
import { Article, ArticleBlockText } from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
// eslint-disable-next-line max-len
import { ArticleBlockTextComponent } from '../ArticleDetails/Blocks/ArticleBlockTextComponent/ArticleBlockTextComponent';
import { ArticleView } from '../../model/const/articleConst';
import { getRouteArticleDetail } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/designV2/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

interface ArticleListItemProps {
	className?: string;
	view: ArticleView;
	article: Article;
	target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo((props) => {
	const { className, article, view, target } = props;
	const { t } = useTranslation('articles');

	const types = <Text text={article.type.join(', ')} className={cls.articleTypes} />;
	const link = getRouteArticleDetail(article.id);

	const views = (
		<>
			<Text text={String(article.views)} className={cls.views} />
			<Icon Svg={EyeIcon} className={cls.viewsIcon} />
		</>
	);

	if (view === ArticleView.TILE) {
		return (
			<AppLink
				data-testid='ArticleListItem.TILE'
				target={target}
				to={link}
				className={classNames(cls.ArticleListItem, {}, [cls.TAIL, className])}
			>
				<Card className={cls.card}>
					<div className={cls.imgWrapper}>
						<Text text={article.createdAt} className={cls.createdAt} />
						<AppImage
							fallback={<Skeleton height='100%' />}
							src={article.img}
							alt={article.title}
							className={cls.img}
						/>
					</div>
					<HStack className={cls.articleInfo}>
						{types}
						{views}
					</HStack>
					<Text text={article.title} className={cls.articleTitle} />
				</Card>
			</AppLink>
		);
	}

	const textBlock = article.blocks.find((block) => block.type === 'text') as ArticleBlockText;

	return (
		<div data-testid='ArticleListItem.LIST' className={classNames(cls.ArticleListItem, {}, [className, cls.LIST])}>
			<Card className={cls.card}>
				<HStack gap={12} className={cls.header}>
					<Avatar src={article.user.avatar} alt={article.user.username} size={30} />
					<Text className={cls.author} text={article.user.username} />
					<Text className={cls.createdAt} text={article.createdAt} />
				</HStack>
				<Text title={article.title} className={cls.articleTitle} />
				{types}
				<AppImage
					fallback={<Skeleton height='100%' />}
					src={article.img}
					alt={article.title}
					className={cls.img}
				/>
				{textBlock && <ArticleBlockTextComponent block={textBlock} className={cls.description} />}
				<HStack className={cls.footer}>
					<AppLink to={link}>
						<Button theme='outline'>
							{t('readMore')}
							...
						</Button>
					</AppLink>
					{views}
				</HStack>
			</Card>
		</div>
	);
});
