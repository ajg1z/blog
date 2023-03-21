import { FC } from 'react';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink';
import { Avatar } from 'shared/ui/Avatar';
import { Skeleton } from 'shared/ui/Skeleton';
import { Text } from 'shared/ui/Text';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string;
    comment: Comment;
    isLoading?: boolean;
}

export const CommentCard: FC<CommentCardProps> = (props) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <div className={classNames(cls.commentCard, {}, [className])}>
                <div className={cls.author}>
                    <Skeleton border='50%' height={30} width={30} />
                    <Skeleton height={20} width={150} />
                </div>
                <Skeleton height={50} className={cls.text} />
            </div>
        );
    }

    return (
        <div className={classNames(cls.commentCard, {}, [className])}>
            <AppLink to={`${RoutePaths.profile}${comment.user.id}`} className={cls.author}>
                {comment.user?.avatar && <Avatar size={30} src={comment.user?.avatar} />}
                <Text title={comment.user.username} />
            </AppLink>
            <Text text={comment.text} className={cls.text} />
        </div>
    );
};
