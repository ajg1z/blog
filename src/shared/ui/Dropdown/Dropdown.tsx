/* eslint-disable no-unused-expressions */
import { Fragment, ReactNode, useEffect, useRef } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { computePosition, shift, flip, Placement } from '@floating-ui/react';
import cls from './DropDown.module.scss';
import { AppLink } from '../AppLink';

export interface DropdownItem {
    content: ReactNode;
    id: number;
    disabled?: boolean;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    placement?: Placement;
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
}

export const Dropdown = (props: DropdownProps) => {
    const { items, trigger, className, placement = 'bottom' } = props;
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const calculatePosition = async (ref: HTMLDivElement | null) => {
        if (buttonRef.current && ref) {
            const { x, y } = await computePosition(buttonRef.current, ref, {
                middleware: [flip(), shift()],
                placement,
                strategy: 'absolute',
            });
            if (ref?.style) {
                Object.assign(ref.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                });
            }
        }
    };

    return (
        <Menu as='div' className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button ref={buttonRef} className={cls.trigger} id='menu-button'>
                {trigger}
            </Menu.Button>
            <Menu.Items ref={calculatePosition} className={cls.menu}>
                {items.map((item) => {
                    if (item.href) {
                        return (
                            <Menu.Item key={item.id} as={Fragment} disabled={item.disabled}>
                                {({ active }) => (
                                    <AppLink
                                        className={classNames(cls.item, { [cls.active]: active })}
                                        to={item.href!}
                                    >
                                        {item.content}
                                    </AppLink>
                                )}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item key={item.id} as={Fragment} disabled={item.disabled}>
                            {({ active }) => (
                                <button
                                    type='button'
                                    disabled={item.disabled}
                                    className={classNames(cls.item, { [cls.active]: active })}
                                    onClick={item.onClick}
                                >
                                    {item.content}
                                </button>
                            )}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
};
