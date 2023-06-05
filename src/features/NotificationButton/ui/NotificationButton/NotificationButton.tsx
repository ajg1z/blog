import { memo, useCallback, useState } from 'react';
import { Placement } from '@floating-ui/react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Popover as DeprecatedPopover } from '@/shared/ui/deprecated/Popover';
import { Popover } from '@/shared/ui/designV2/Popover';
import { Button as DeprecatedButton, ButtonProps } from '@/shared/ui/deprecated/Button';
import { Icon as DeprecatedIcon } from '@/shared/ui/deprecated/Icon';
import { NotificationsList } from '@/entities/Notification';
import DeprecatedNotificationIcon from '@/shared/assets/img/notification.svg';
import NotificationIcon from '@/shared/assets/img/notification-v2.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Drawer as DeprecatedDrawer } from '@/shared/ui/deprecated/Drawer';
import { Drawer } from '@/shared/ui/designV2/Drawer';
import cls from './NotificationButton.module.scss';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { IconButton } from '@/shared/ui/designV2/Icon/IconButton';
import { Icon } from '@/shared/ui/designV2/Icon';

interface NotificationButtonProps {
	placement?: Placement;
	className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
	const { placement = 'bottom-start', className } = props;
	const [isOpen, setIsOpen] = useState(false);

	const onOpenDrawer = useCallback(() => {
		setIsOpen(true);
	}, []);

	const onCloseDrawer = useCallback(() => {
		setIsOpen(false);
	}, []);

	const triggerProps: ButtonProps = {
		theme: 'clear',
	};

	return (
		<ToggleFeatureComponent
			name='isAppRedesigned'
			off={
				<>
					<MobileView>
						<DeprecatedButton theme='clear' onClick={onOpenDrawer}>
							<DeprecatedIcon width={20} height={20} Svg={DeprecatedNotificationIcon} />
						</DeprecatedButton>
						<DeprecatedDrawer isOpen={isOpen} onClose={onCloseDrawer}>
							<NotificationsList className={cls.notificationsMobile} />
						</DeprecatedDrawer>
					</MobileView>
					<BrowserView>
						<DeprecatedPopover
							triggerProps={triggerProps}
							placement={placement}
							unmount
							trigger={<DeprecatedIcon width={20} height={20} Svg={DeprecatedNotificationIcon} />}
						>
							<NotificationsList className={classNames(cls.notifications, {}, [className])} />
						</DeprecatedPopover>
					</BrowserView>
				</>
			}
			on={
				<>
					<MobileView>
						<IconButton width={30} height={30} Svg={NotificationIcon} onClick={onOpenDrawer} />
						<Drawer isOpen={isOpen} onClose={onCloseDrawer}>
							<NotificationsList className={cls.notificationsMobile} />
						</Drawer>
					</MobileView>
					<BrowserView>
						<Popover
							triggerProps={triggerProps}
							placement={placement}
							unmount
							trigger={<Icon width={30} height={30} Svg={NotificationIcon} />}
						>
							<NotificationsList className={classNames(cls.notifications, {}, [className])} />
						</Popover>
					</BrowserView>
				</>
			}
		/>
	);
});
