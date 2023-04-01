import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import { useSelector } from 'react-redux';
import { getCanEdit } from 'pages/ArticleDetailsPage/model/selectors/article';
import { getArticleDetailsData } from 'entities/Article';
import cls from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo(
    (props: PropsWithChildren<ArticleDetailsPageHeaderProps>) => {
        const { className } = props;
        const { t } = useTranslation('article');
        const { t: commonT } = useTranslation();

        const navigate = useNavigate();
        const canEdit = useSelector(getCanEdit);
        const article = useSelector(getArticleDetailsData);

        const onBackToList = useCallback(() => {
            navigate(RoutePaths.articles);
        }, [navigate]);

        const onEdit = () => {
            navigate(`${RoutePaths.articles}/${article?.id}/edit`);
        };

        return (
            <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
                <Button onClick={onBackToList}>{t('backToArticles')}</Button>
                {canEdit && (
                    <Button className={cls.editBtn} onClick={onEdit}>
                        {commonT('button.edit')}
                    </Button>
                )}
            </div>
        );
    },
);
