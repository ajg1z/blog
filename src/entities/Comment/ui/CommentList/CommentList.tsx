/* eslint-disable operator-linebreak */
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { CircleLoader } from '@/shared/ui/deprecated/CircleLoader';
import { Text } from '@/shared/ui/deprecated/Text';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';

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
		<div className={classNames(cls.CommentList, {}, [className])}>
			{comments?.map((comment) => (
				<CommentCard isLoading={isLoading} className={cls.comment} key={comment.id} comment={comment} />
			))}
			{isLoading && <CircleLoader size='medium' />}
			{error && <Text text={t('errorLoadingComments')} />}
			{isNoComments && <Text text={t('noComments')} />}
		</div>
	);
});
