import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { createArray } from 'shared/lib/arrayUtils/arrayUtils';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view: ArticleView;
}

export const ArticleList: FC<ArticleListProps> = memo((props) => {
    const { className, articles, view = ArticleView.TILE, isLoading } = props;
    const { t } = useTranslation('articles');

    const getSkeletons = () =>
        createArray(view === ArticleView.TILE ? 12 : 3).map((index) => (
            <ArticleListItemSkeleton key={index} view={view} />
        ));

    const renderArticle = (article: Article) => (
        <ArticleListItem article={article} view={view} key={article.id} />
    );

    return (
        <div className={classNames(cls.ArticleList, {}, [className])}>
            {!!articles.length && articles.map(renderArticle)}

            {!isLoading && !articles.length && (
                <Text title={t('noArticles')} align='center' className={cls.noArticles} />
            )}

            {isLoading && getSkeletons()}
        </div>
    );
});