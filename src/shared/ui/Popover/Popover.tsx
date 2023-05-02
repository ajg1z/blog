import { FC, ReactNode, useRef } from 'react';
import { Popover as HPopover } from '@headlessui/react';
import { Placement } from '@floating-ui/react';
import { useCalculatePosition } from '@/shared/hooks/useCalculatePosition/useCalculatePosition';
import cls from './Popover.module.scss';

interface PopoverProps {
    className?: string;
    trigger?: ReactNode;
    children?: ReactNode;
    placement?: Placement;
    unmount?: boolean;
}

export const Popover: FC<PopoverProps> = (props) => {
    const { className, children, placement = 'bottom', trigger, unmount } = props;
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const calculatePosition = useCalculatePosition(buttonRef, placement);

    return (
        <HPopover className={className}>
            <HPopover.Button className={cls.trigger} ref={buttonRef}>
                {trigger}
            </HPopover.Button>
            <HPopover.Panel unmount={unmount} ref={calculatePosition} className={cls.panel}>
                {children}
            </HPopover.Panel>
        </HPopover>
    );
};
