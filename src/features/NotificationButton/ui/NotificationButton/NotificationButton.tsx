import { memo, useCallback, useState } from 'react';
import { Placement } from '@floating-ui/react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Popover } from '@/shared/ui/Popover';
import { Button, ButtonProps } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { NotificationsList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/img/notification.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Drawer } from '@/shared/ui/Drawer';
import cls from './NotificationButton.module.scss';

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
        <>
            <MobileView>
                <Button theme='clear' onClick={onOpenDrawer}>
                    <Icon Svg={NotificationIcon} />
                </Button>
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationsList className={cls.notificationsMobile} />
                </Drawer>
            </MobileView>
            <BrowserView>
                <Popover
                    triggerProps={triggerProps}
                    placement={placement}
                    unmount
                    trigger={<Icon Svg={NotificationIcon} />}
                >
                    <NotificationsList className={classNames(cls.notifications, {}, [className])} />
                </Popover>
            </BrowserView>
        </>
    );
});
