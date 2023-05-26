import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { PageWrapper } from '@/widgets/PageWrapper';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { articleDetailsCommentsReducer } from '../../model/slice/articleDetailsCommentsSlice';
// eslint-disable-next-line max-len
import { fetchCommentsByArticleId } from '../../model/service/fetchCommentsByArticleId/fetchCommentsByArticleId';
import cls from './ArticleDetailsPage.module.scss';
// eslint-disable-next-line max-len
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/ArticleRating';
import { toggleFeature } from '@/shared/lib/featureFlags';
import { Card } from '@/shared/ui/Card';

interface ArticleDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = (props) => {
	const { className } = props;
	const { t } = useTranslation('article');
	const { id } = useParams<{ id: string }>();

	const dispatch = useAppDispatch();

	useInitialEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
	});

	if (!id) {
		return <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>{t('articleNotFound')}</div>;
	}

	const articleRating = toggleFeature({
		name: 'isArticleRatingEnabled',
		off: () => <Card>{t('Скоро будет доступна оценка статьи!')}</Card>,
		on: () => <ArticleRating articleId={id} className={cls.articleRating} />,
	});

	return (
		<DynamicModuleLoader reducers={reducers} isRemoveAfterUnmount>
			<PageWrapper>
				<div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
					<ArticleDetailsPageHeader />
					<ArticleDetails id={id} />
					{articleRating}
					<ArticleRecommendationsList />
					<ArticleDetailsComments id={id} className={cls.articleComments} />
				</div>
			</PageWrapper>
		</DynamicModuleLoader>
	);
};

export default ArticleDetailsPage;
