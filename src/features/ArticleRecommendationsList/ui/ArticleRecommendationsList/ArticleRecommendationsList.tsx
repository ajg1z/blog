import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { ArticleList, ArticleView } from '@/entities/Article';
import cls from './ArticleRecommendationsList.module.scss';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const { data: articles = [], isError, refetch, isFetching } = useArticleRecommendationsList(6);

    const errorMessage = isError ? t('errorLoading') : '';

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <div className={classNames('', {}, [className])}>
            <Text title={t('recommendations')} className={cls.title} />
            <ArticleList
                target='_blank'
                articles={articles}
                view={ArticleView.TILE}
                isLoading={isFetching}
                error={errorMessage}
                className={cls.recommendationsArticles}
            />
        </div>
    );
});
