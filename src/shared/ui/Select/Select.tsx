/* eslint-disable react/jsx-props-no-spreading */
import { classNames, ClassNamesMods } from 'shared/lib/classNames/classNames';

import { memo, PropsWithChildren, SelectHTMLAttributes, useMemo } from 'react';
import cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    label?: string;
    readOnly?: boolean;
    options: SelectOption[];
}

export const Select = memo((props: PropsWithChildren<SelectProps>) => {
    const { className, options, label, readOnly, ...otherProps } = props;

    const optionsList = useMemo(
        () =>
            options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.content}
                </option>
            )),
        [options],
    );

    const mods: ClassNamesMods = {
        [cls.readOnly]: readOnly,
    };

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && (
                <label htmlFor='select_label' className={cls.label}>
                    {label}
                </label>
            )}
            <select
                {...otherProps}
                id='select_label'
                disabled={readOnly ?? otherProps.disabled}
                className={cls.select}
            >
                {optionsList}
            </select>
        </div>
    );
});
