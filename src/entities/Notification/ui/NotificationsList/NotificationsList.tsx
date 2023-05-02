import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { useNotifications } from '../../api/notificationApi';
import cls from './NotificationsList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { NotificationSkeletonItem } from '../NotificationSkeletonItem/NotificationSkeletonItem';

interface NotificationsListProps {
    className?: string;
}

export const NotificationsList = memo((props: PropsWithChildren<NotificationsListProps>) => {
    const { className } = props;
    const { t } = useTranslation();

    const {
        data: notifications = [],
        isLoading,
        isError,
    } = useNotifications(null, {
        pollingInterval: 5000,
    });

    if (isError) {
        return (
            <VStack gap={12} className={classNames(cls.NotificationsList, {}, [className])}>
                <Text theme='error' text={t('notificationError')} />
            </VStack>
        );
    }

    if (isLoading) {
        return (
            <VStack gap={12} className={classNames(cls.NotificationsList, {}, [className])}>
                <NotificationSkeletonItem />
                <NotificationSkeletonItem />
                <NotificationSkeletonItem />
                <NotificationSkeletonItem />
            </VStack>
        );
    }

    return (
        <VStack gap={12} className={classNames(cls.NotificationsList, {}, [className])}>
            {notifications?.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
            ))}
        </VStack>
    );
});
