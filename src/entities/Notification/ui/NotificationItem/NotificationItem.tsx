import { PropsWithChildren, memo } from 'react';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as DeprecatedCard } from '@/shared/ui/deprecated/Card';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { Card } from '@/shared/ui/designV2/Card';
import { Text } from '@/shared/ui/designV2/Text';

interface NotificationItemProps {
	className?: string;
	notification: Notification;
}

export const NotificationItem = memo((props: PropsWithChildren<NotificationItemProps>) => {
	const { className, notification } = props;

	const content = (
		<ToggleFeatureComponent
			name='isAppRedesigned'
			off={
				<DeprecatedCard className={classNames(cls.NotificationItem, {}, [className])}>
					<DeprecatedText title={notification.title} />
					<DeprecatedText text={notification.description} />
				</DeprecatedCard>
			}
			on={
				<Card className={classNames(cls.NotificationItem, {}, [className])}>
					<Text title={notification.title} />
					<Text text={notification.description} />
				</Card>
			}
		/>
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
