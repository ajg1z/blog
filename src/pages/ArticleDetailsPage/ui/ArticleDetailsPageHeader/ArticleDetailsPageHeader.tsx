import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { getArticleDetailsData } from '@/entities/Article';
import { HStack } from '@/shared/ui/Stack';
import { getCanEdit } from '../../model/selectors/article';
import cls from './ArticleDetailsPageHeader.module.scss';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';

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
            navigate(getRouteArticles());
        }, [navigate]);

        const onEdit = () => {
            navigate(getRouteArticleEdit(article?.id));
        };

        return (
            <HStack className={classNames('', {}, [className])}>
                <Button onClick={onBackToList}>{t('backToArticles')}</Button>
                {canEdit && (
                    <Button className={cls.editBtn} onClick={onEdit}>
                        {commonT('button.edit')}
                    </Button>
                )}
            </HStack>
        );
    },
);
