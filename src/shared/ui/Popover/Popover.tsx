import { FC, Fragment, ReactNode, useRef } from 'react';
import { Popover as HPopover } from '@headlessui/react';
import { Placement } from '@floating-ui/react';
import { useCalculatePosition } from '@/shared/lib/hooks/useCalculatePosition/useCalculatePosition';
import cls from './Popover.module.scss';
import { Button, ButtonProps } from '@/shared/ui/Button';

interface PopoverProps {
    className?: string;
    trigger?: ReactNode;
    triggerProps?: Omit<ButtonProps, 'disabled'>;
    children?: ReactNode;
    placement?: Placement;
    unmount?: boolean;
    disabled?: boolean;
}

export const Popover: FC<PopoverProps> = (props) => {
    const {
        className,
        children,
        placement = 'bottom',
        disabled,
        triggerProps,
        trigger,
        unmount,
    } = props;

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const calculatePosition = useCalculatePosition(buttonRef, placement);

    return (
        <HPopover className={className}>
            <HPopover.Button as={Fragment}>
                <Button {...triggerProps} ref={buttonRef} disabled={disabled}>
                    {trigger}
                </Button>
            </HPopover.Button>
            <HPopover.Panel unmount={unmount} ref={calculatePosition} className={cls.panel}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
};
