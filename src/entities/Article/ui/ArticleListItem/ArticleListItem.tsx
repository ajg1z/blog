import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card';
import { Icon } from 'shared/ui/Icon';
import { Text } from 'shared/ui/Text';
import EyeIcon from 'shared/assets/img/eye.svg';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import { Article, ArticleBlockText, ArticleView } from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
// eslint-disable-next-line max-len
import { ArticleBlockTextComponent } from '../ArticleDetails/Blocks/ArticleBlockTextComponent/ArticleBlockTextComponent';

interface ArticleListItemProps {
    className?: string;
    view: ArticleView;
    article: Article;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo((props) => {
    const { className, article, view } = props;
    const { t } = useTranslation('articles');

    const navigate = useNavigate();

    const openArticle = () => {
        navigate(RoutePaths.articleDetail + article.id);
    };

    const types = <Text text={article.type.join(', ')} className={cls.articleTypes} />;

    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} className={cls.viewsIcon} />
        </>
    );

    if (view === ArticleView.TILE) {
        return (
            <div className={classNames(cls.ArticleListItem, {}, [cls.TAIL, className])}>
                <Card className={cls.card} onClick={openArticle}>
                    <div className={cls.imgWrapper}>
                        <Text text={article.createdAt} className={cls.createdAt} />
                        <img src={article.img} alt={article.title} className={cls.img} />
                    </div>
                    <div className={cls.articleInfo}>
                        {types}
                        {views}
                    </div>
                    <Text text={article.title} className={cls.articleTitle} />
                </Card>
            </div>
        );
    }

    const textBlock = article.blocks.find((block) => block.type === 'text') as ArticleBlockText;

    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls.LIST])}>
            <Card className={cls.card}>
                <div className={cls.header}>
                    <Avatar src={article.user.avatar} alt={article.user.username} size={30} />
                    <Text className={cls.author} text={article.user.username} />
                    <Text className={cls.createdAt} text={article.createdAt} />
                </div>
                <Text title={article.title} className={cls.articleTitle} />
                {types}
                <img src={article.img} alt={article.title} className={cls.img} />
                {textBlock && (
                    <ArticleBlockTextComponent block={textBlock} className={cls.description} />
                )}
                <div className={cls.footer}>
                    <Button theme='outline' onClick={openArticle}>
                        {t('readMore')}
                        ...
                    </Button>
                    {views}
                </div>
            </Card>
        </div>
    );
});
