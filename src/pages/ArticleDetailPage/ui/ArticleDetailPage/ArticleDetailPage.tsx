import { ArticleDetail } from 'entities/Article';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailPage.module.scss';

interface ArticleDetailPageProps {
    className?: string;
}

const ArticleDetailPage: FC<ArticleDetailPageProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailPage, {}, [className])}>
                {t('article-not-found')}
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleDetailPage, {}, [className])}>
            <ArticleDetail id={id} />
        </div>
    );
};

export default ArticleDetailPage;
