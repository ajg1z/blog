import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo } from 'react';
import { Skeleton } from 'shared/ui/Skeleton';
import cls from './NotificationSkeletonItem.module.scss';

interface NotificationSkeletonItemProps {
    // className?: string;
}

export const NotificationSkeletonItem = memo(
    (props: PropsWithChildren<NotificationSkeletonItemProps>) => {
        const { t } = useTranslation();

        return (
            <Skeleton border='5px' height='max-content' className={cls.NotificationSkeletonItem}>
                <Skeleton border='5px' height={20} className={cls.title} />
                <Skeleton border='5px' height={40} />
            </Skeleton>
        );
    },
);
