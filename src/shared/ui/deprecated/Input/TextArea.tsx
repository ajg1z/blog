import { useTranslation } from 'react-i18next';
import { ChangeEvent, PropsWithChildren, TextareaHTMLAttributes, memo } from 'react';
import cls from './Input.module.scss';
import { InputTheme } from './Input';
import { classNames } from '@/shared/lib/classNames/classNames';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    theme?: InputTheme;
    onChangeValue?: (value: string) => void;
}

export const TextArea = memo((props: PropsWithChildren<TextAreaProps>) => {
    const { className, onChange, onChangeValue, theme = 'background', ...otherProps } = props;
    const { t } = useTranslation();

    const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e);
        onChangeValue?.(e.target.value);
    };

    return (
        <textarea
            onChange={onChangeTextArea}
            {...otherProps}
            className={classNames(cls.TextArea, {}, [className, cls[theme]])}
        />
    );
});
