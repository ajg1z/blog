import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BiMessageAltError } from 'react-icons/bi';
import cls from './ArticleRating.module.scss';
import { RatingCard } from '@/entities/Rating';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useArticleRating } from '../api/artilceRatingApi';
import { getUserData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Icon } from '@/shared/ui/Icon';

interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

export const ArticleRating = memo((props: PropsWithChildren<ArticleRatingProps>) => {
    const { className, articleId } = props;
    const { t } = useTranslation('article');

    const userData = useSelector(getUserData);

    const {
        data: articleRating,
        isError,
        isFetching,
        refetch,
    } = useArticleRating({
        articleId,
        userId: userData?.id ?? 0,
    });

    useInitialEffect(() => {
        refetch();
    });

    if (isFetching) {
        return (
            <Skeleton
                className={classNames(cls.RatingCard, {}, [className])}
                height={120}
                border='5px'
            />
        );
    }

    if (isError) {
        return (
            <Card className={classNames(cls.RatingCard, { [cls.error]: isError }, [className])}>
                <Text align='center' text={t('rating.error')} />
                <Icon Svg={BiMessageAltError} className={cls.errorIcon} />
            </Card>
        );
    }

    return (
        <RatingCard
            title={t('rating.title')}
            feedbackTitle={t('rating.feedbackTitle')}
            hasFeedback
            className={classNames(cls.RatingCard, {}, [className])}
            rate={articleRating?.rate}
            // onCancel={}
            // onSendRating={}
        />
    );
});
