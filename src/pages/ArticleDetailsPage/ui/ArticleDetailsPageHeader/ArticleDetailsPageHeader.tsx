import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as DeprecatedButton } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/designV2/Button';
import { getArticleDetailsData } from '@/entities/Article';
import { HStack } from '@/shared/ui/designV2/Stack';
import { getCanEdit } from '../../model/selectors/article';
import cls from './ArticleDetailsPageHeader.module.scss';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { Avatar } from '@/shared/ui/designV2/Avatar';
import { Text } from '@/shared/ui/designV2/Text';

interface ArticleDetailsPageHeaderProps {
	className?: string;
}

export const ArticleDetailsPageHeader = memo((props: PropsWithChildren<ArticleDetailsPageHeaderProps>) => {
	const { className } = props;
	const { t } = useTranslation('article');
	const { t: commonT } = useTranslation();

	const navigate = useNavigate();
	const canEdit = useSelector(getCanEdit);
	const article = useSelector(getArticleDetailsData);

	const onBackToList = useCallback(() => {
		navigate(getRouteArticles());
	}, [navigate]);

	const onEdit = () => {
		navigate(getRouteArticleEdit(article?.id));
	};

	return (
		<HStack className={classNames(cls.ArticleDetailsPageHeader, {}, [className])} gap={8}>
        					<HStack gap={8}>
        						<Avatar src={article?.user.avatar} size={33} />
        						<Text text={article?.user.username} bold />
        						<Text text={article?.createdAt} bold />
        					</HStack>

        					<Text text={t('{{count}} views', { count: article?.views ?? 0 })} className={cls.views} />
        					{canEdit && (
        						<Button variant='filled' className={cls.editBtn} onClick={onEdit}>
        							{commonT('button.edit')}
        						</Button>
        					)}
        					<Button onClick={onBackToList}>{t('backToArticles')}</Button>
        				</HStack>
	);
});
