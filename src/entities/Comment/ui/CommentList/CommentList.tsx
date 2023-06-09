/* eslint-disable operator-linebreak */
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { CircleLoader } from '@/shared/ui/designV2/CircleLoader';
import { CircleLoader as DeprecatedCircleLoader } from '@/shared/ui/deprecated/CircleLoader';
import { Text } from '@/shared/ui/designV2/Text';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';

interface CommentListProps {
	className?: string;
	comments?: Comment[];
	isLoading: boolean;
	error?: string;
}

export const CommentList: FC<CommentListProps> = memo((props) => {
	const { className, comments = [], isLoading, error } = props;
	const { t } = useTranslation();

	const isNoComments = Boolean(!comments?.length) && !isLoading && !error;

	return (
		<ToggleFeatureComponent
			name='isAppRedesigned'
			off={
				<div className={classNames(cls.CommentList, {}, [className])}>
					{comments?.map((comment) => (
						<CommentCard className={cls.comment} key={comment.id} comment={comment} />
					))}
					{isLoading && <DeprecatedCircleLoader size='medium' />}
					{error && <DeprecatedText text={t('errorLoadingComments')} />}
					{isNoComments && <DeprecatedText text={t('noComments')} />}
				</div>
			}
			on={
				<div className={classNames(cls.CommentList, {}, [className])}>
					{comments?.map((comment) => (
						<CommentCard className={cls.comment} key={comment.id} comment={comment} />
					))}
					{isLoading && <CircleLoader size='medium' />}
					{error && <Text text={t('errorLoadingComments')} />}
					{isNoComments && <Text text={t('noComments')} />}
				</div>
			}
		/>
	);
});
