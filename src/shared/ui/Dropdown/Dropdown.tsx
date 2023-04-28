/* eslint-disable no-unused-expressions */
import { Fragment, ReactNode, useRef } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { computePosition, shift, flip, Placement } from '@floating-ui/react';
import { AppLink } from 'shared/ui/AppLink';
import { Button } from 'shared/ui/Button';
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
    disabled?: boolean;
}

export const Dropdown = (props: DropdownProps) => {
    const { items, trigger, className, placement = 'bottom', disabled } = props;
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
            <Menu.Button
                ref={buttonRef}
                className={cls.trigger}
                id='menu-button'
                disabled={disabled}
            >
                {trigger}
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
                                        to={item.href!}
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
