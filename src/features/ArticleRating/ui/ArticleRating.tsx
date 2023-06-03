import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { BiMessageAltError } from 'react-icons/bi';
import cls from './ArticleRating.module.scss';
import { RatingCard } from '@/entities/Rating';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useArticleRating, useRateArticle } from '../api/artilceRatingApi';
import { getUserData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Card } from '@/shared/ui/deprecated/Card';
import { Text } from '@/shared/ui/deprecated/Text';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Icon } from '@/shared/ui/deprecated/Icon';

export interface ArticleRatingProps {
	className?: string;
	articleId: string;
}

const ArticleRating = memo((props: PropsWithChildren<ArticleRatingProps>) => {
	const { className, articleId } = props;
	const { t } = useTranslation('article');

	const userData = useSelector(getUserData);
	const userId = userData?.id ?? 0;

	const { data, isError, isFetching, refetch } = useArticleRating({
		articleId,
		userId,
	});

	const [rateArticleMutation, rateArticleMutationResult] = useRateArticle();

	useInitialEffect(() => {
		refetch();
	});

	const handleRateArticle = useCallback(
		(startCount: number, feedback?: string) => {
			try {
				rateArticleMutation({
					rate: startCount,
					articleId,
					userId,
					feedback,
				});
			} catch (e) {
				console.log(e);
			}
		},
		[articleId, rateArticleMutation, userId],
	);

	const onCancel = useCallback(
		(startCount: number) => {
			handleRateArticle(startCount);
		},
		[handleRateArticle],
	);

	const onSendRating = useCallback(
		(startCount: number, feedback?: string) => {
			handleRateArticle(startCount, feedback);
		},
		[handleRateArticle],
	);

	if (isFetching) {
		return <Skeleton className={classNames(cls.RatingCard, {}, [className])} height={120} border='5px' />;
	}

	if (isError || rateArticleMutationResult.isError) {
		return (
			<Card className={classNames(cls.RatingCard, { [cls.error]: isError }, [className])}>
				<Text align='center' text={isError ? t('rating.errorLoading') : t('rating.errorRate')} />
				<Icon Svg={BiMessageAltError} className={cls.errorIcon} />
			</Card>
		);
	}

	const rating = data?.[0];
	const isSetRated = rating?.rate || rateArticleMutationResult.data;

	return (
		<RatingCard
			initFeedback={rating?.feedback}
			isSending={rateArticleMutationResult.isLoading}
			title={isSetRated ? t('rating.thanksForEvaluate') : t('rating.evaluate')}
			feedbackTitle={t('rating.feedbackTitle')}
			hasFeedback
			className={classNames(cls.RatingCard, {}, [className])}
			rate={rating?.rate}
			onCancel={onCancel}
			onSendRating={onSendRating}
		/>
	);
});

export default ArticleRating;
