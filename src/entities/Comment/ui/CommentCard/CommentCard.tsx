import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text } from '@/shared/ui/deprecated/Text';
import { HStack } from '@/shared/ui/designV2/Stack';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';

interface CommentCardProps {
	className?: string;
	comment: Comment;
	isLoading?: boolean;
}

export const CommentCard: FC<CommentCardProps> = (props) => {
	const { className, comment, isLoading } = props;

	if (isLoading) {
		return (
			<div data-testid='CommentCard.Loading' className={classNames(cls.commentCard, {}, [className])}>
				<HStack gap={12}>
					<Skeleton border='50%' height={30} width={30} />
					<Skeleton height={20} width={150} />
				</HStack>
				<Skeleton height={50} className={cls.text} />
			</div>
		);
	}

	return (
		<div data-testid='CommentCard.Content' className={classNames(cls.commentCard, {}, [className])}>
			<AppLink to={getRouteProfile(comment.user.id)}>
				<HStack gap={12}>
					{comment.user?.avatar && <Avatar size={30} src={comment.user?.avatar} />}
					<Text title={comment.user.username} />
				</HStack>
			</AppLink>
			<Text text={comment.text} className={cls.text} />
		</div>
	);
};
