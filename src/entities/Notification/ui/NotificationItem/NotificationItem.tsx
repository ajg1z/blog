import { PropsWithChildren, memo } from 'react';
import { Text } from 'shared/ui/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';

interface NotificationItemProps {
    className?: string;
    notification: Notification;
}

export const NotificationItem = memo((props: PropsWithChildren<NotificationItemProps>) => {
    const { className, notification } = props;

    const content = (
        <Card className={classNames(cls.NotificationItem, {}, [className])}>
            <Text title={notification.title} />
            <Text text={notification.description} />
        </Card>
    );

    if (notification.href) {
        return (
            <a className={cls.link} href={notification.href} target='_blank' rel='noreferrer'>
                {content}
            </a>
        );
    }

    return (
        <Card className={classNames(cls.NotificationItem, {}, [className])}>
            <Text title={notification.title} />
            <Text text={notification.description} />
        </Card>
    );
});
