/* eslint-disable no-unused-expressions */
import { Fragment, ReactNode, useRef } from 'react';
import { Menu } from '@headlessui/react';
import { Placement } from '@floating-ui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Button, ButtonProps } from '@/shared/ui/Button';
import { useCalculatePosition } from '@/shared/lib/hooks/useCalculatePosition/useCalculatePosition';
import cls from './Dropdown.module.scss';

export interface DropdownItem {
    content: ReactNode;
    id: string;
    disabled?: boolean;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    placement?: Placement;
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    triggerProps?: Omit<ButtonProps, 'disabled'>;
    disabled?: boolean;
}

export const Dropdown = (props: DropdownProps) => {
    const { items, trigger, className, placement = 'bottom', disabled, triggerProps } = props;
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const calculatePosition = useCalculatePosition(buttonRef, placement);

    return (
        <Menu as='div' className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button as={Fragment}>
                <Button {...triggerProps} ref={buttonRef} disabled={disabled}>
                    {trigger}
                </Button>
            </Menu.Button>
            <Menu.Items ref={calculatePosition} className={cls.menu}>
                {items.map((item) => (
                    <Menu.Item key={item.id} as={Fragment} disabled={item.disabled}>
                        {({ active }) => {
                            if (item.href) {
                                return (
                                    <AppLink
                                        className={classNames(cls.item, {
                                            [cls.active]: active,
                                        })}
                                        to={item.href}
                                    >
                                        {item.content}
                                    </AppLink>
                                );
                            }

                            return (
                                <Button
                                    disabled={item.disabled}
                                    className={classNames(cls.item, {
                                        [cls.active]: active,
                                    })}
                                    onClick={item.onClick}
                                >
                                    {item.content}
                                </Button>
                            );
                        }}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    );
};
