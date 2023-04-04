import { Fragment, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Listbox as HListBox } from '@headlessui/react';
import cls from './ListBox.module.scss';
import { Button } from '../Button';
import { HStack } from '../Stack';

export interface ListBoxItem<T extends string> {
    value: T;
    content: ReactNode;
    disabled?: boolean;
}

export interface ListBoxProps<T extends string> {
    className?: string;
    items?: ListBoxItem<T>[];
    value?: T;
    onChange?: (value: T) => void;
    defaultValue?: T;
    label?: string;
    readonly?: boolean;
    disabled?: boolean;
}

export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
    const { items, onChange, value, className, defaultValue, label, readonly, disabled } = props;

    return (
        <HStack gap={12}>
            {label && <span>{label}</span>}
            <HListBox
                as='div'
                value={value}
                className={classNames(cls.ListBox, {}, [className])}
                onChange={onChange}
            >
                <HListBox.Button
                    className={classNames(cls.trigger, { [cls.readonly]: readonly }, [])}
                >
                    <Button
                        disabled={disabled || readonly}
                        theme={readonly ? 'clearInverted' : 'outline'}
                    >
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={cls.options}>
                    {items?.map((option) => (
                        <HListBox.Option
                            key={option.value}
                            value={option.value}
                            as={Fragment}
                            disabled={option.disabled}
                        >
                            {({ selected, active, disabled }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [cls.selectedItem]: selected,
                                        [cls.disabledItem]: disabled,
                                        [cls.activeItem]: active,
                                    })}
                                >
                                    {option.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
};
