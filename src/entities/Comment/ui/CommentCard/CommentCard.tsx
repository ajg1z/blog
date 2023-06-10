import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink as DeprecatedAppLink } from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/designV2/AppLink';
import { Avatar as DeprecatedAvatar } from '@/shared/ui/deprecated/Avatar';
import { Avatar } from '@/shared/ui/designV2/Avatar';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/designV2/Text';
import { HStack } from '@/shared/ui/designV2/Stack';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { Card } from '@/shared/ui/designV2/Card';

interface CommentCardProps {
	className?: string;
	comment: Comment;
}

export const CommentCard: FC<CommentCardProps> = (props) => {
	const { className, comment } = props;

	return (
		<Card
        					padding={10}
        					data-testid='CommentCard.Content'
        					className={classNames(cls.redesignedCommentCard, {}, [className])}
        				>
        					<AppLink to={getRouteProfile(comment.user.id)}>
        						<HStack gap={12}>
        							{comment.user?.avatar && <Avatar size={30} src={comment.user?.avatar} />}
        							<Text title={comment.user.username} />
        						</HStack>
        					</AppLink>
        					<Text text={comment.text} className={cls.text} />
        				</Card>
	);
};
