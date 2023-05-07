import { lazy, Suspense } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './ArticleRating.module.scss';

export const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
    <Suspense fallback={<Skeleton className={cls.RatingCard} height={120} border='5px' />}>
        <ArticleRatingLazy {...props} />
    </Suspense>
);
