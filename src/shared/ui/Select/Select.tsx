/* eslint-disable react/jsx-props-no-spreading */
import { classNames } from 'shared/lib/classNames/classNames';

import { memo, PropsWithChildren, SelectHTMLAttributes, useMemo } from 'react';
import cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    label?: string;
    options: SelectOption[];
}

export const Select = memo((props: PropsWithChildren<SelectProps>) => {
    const { className, options, label, ...otherProps } = props;

    const optionsList = useMemo(
        () =>
            options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.content}
                </option>
            )),
        [options],
    );

    return (
        <div className={classNames(cls.Wrapper, {}, [className])}>
            {label && (
                <label htmlFor='select_label' className={cls.label}>
                    {label}
                </label>
            )}
            <select {...otherProps} id='select_label' className={cls.select}>
                {optionsList}
            </select>
        </div>
    );
});
