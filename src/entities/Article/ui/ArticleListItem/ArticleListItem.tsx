import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card';
import { Icon } from 'shared/ui/Icon';
import { Text } from 'shared/ui/Text';
import EyeIcon from 'shared/assets/img/eye.svg';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
    className?: string;
    view: ArticleView;
    article: Article;
}

export const ArticleListItem: FC<ArticleListItemProps> = (props) => {
    const { className, article, view } = props;
    const { t } = useTranslation();

    if (view === ArticleView.LIST) {
        return (
            <div className={classNames(cls.ArticleListItem, {}, [cls.TAIL])}>
                <Card className={cls.card}>
                    <div className={cls.imgWrapper}>
                        <Text text={article.createdAt} className={cls.createdAt} />
                        <img src={article.img} alt={article.title} className={cls.img} />
                    </div>
                    <div className={cls.articleInfo}>
                        <Text text={article.type.join(', ')} className={cls.articleTypes} />
                        <Text text={String(article.views)} className={cls.views} />
                        <Icon Svg={EyeIcon} className={cls.viewsIcon} />
                    </div>
                    <Text text={article.title} className={cls.articleTitle} />
                </Card>
            </div>
        );
    }

    return <div className={classNames(cls.ArticleListItem, {}, [className])}>{article.title}</div>;
};
