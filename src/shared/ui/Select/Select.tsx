import { classNames, ClassNamesMods } from 'shared/lib/classNames/classNames';
import { ChangeEvent, useMemo } from 'react';
import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

export interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
    disabled?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const { className, label, options, onChange, value, readonly, disabled } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value as T);
        }
    };

    const optionsList = useMemo(
        () =>
            options?.map((opt) => (
                <option className={cls.option} value={opt.value} key={opt.value}>
                    {opt.content}
                </option>
            )),
        [options],
    );

    const mods: ClassNamesMods = {
        [cls.readOnly]: readonly,
    };

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && <span className={cls.label}>{`${label}`}</span>}
            <select
                disabled={readonly || disabled}
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
            >
                {optionsList}
            </select>
        </div>
    );
};
