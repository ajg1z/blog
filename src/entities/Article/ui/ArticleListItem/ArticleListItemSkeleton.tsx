import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card';
import { Skeleton } from 'shared/ui/Skeleton';
import { ArticleView } from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
// eslint-disable-next-line max-len

interface ArticleListItemProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton: FC<ArticleListItemProps> = (props) => {
    const { className, view } = props;

    if (view === ArticleView.LIST) {
        return (
            <div className={classNames(cls.ArticleListItem, {}, [cls.TAIL, className])}>
                <Card className={cls.card}>
                    <div className={cls.imgWrapper}>
                        <Skeleton height={200} />
                    </div>
                    <div className={cls.articleInfo}>
                        <Skeleton width={150} height={20} />
                    </div>
                    <Skeleton width={240} height={20} />
                </Card>
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls.LIST])}>
            <Card className={cls.card}>
                <div className={classNames(cls.header, cls.skeletonHeader)}>
                    <Skeleton border='50%' height={30} width={30} />
                    <Skeleton height={20} width={130} />
                    <Skeleton height={20} width={130} className={cls.createdAt} />
                </div>
                <Skeleton height={25} width={330} className={cls.articleTitle} />
                <div className={cls.skeletonTypes}>
                    <Skeleton height={20} width={40} className={cls.articleTitle} />
                    <Skeleton height={20} width={40} className={cls.articleTitle} />
                </div>

                <Skeleton height={200} className={classNames(cls.img, {}, [cls.skeletonImg])} />

                <Skeleton height={80} className={cls.skeletonDescription} />
                <Skeleton height={50} className={cls.skeletonDescription} />
                <div className={cls.footer}>
                    <Skeleton height={25} width={80} />
                </div>
            </Card>
        </div>
    );
};
