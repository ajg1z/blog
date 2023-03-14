import { memo, PropsWithChildren, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import CopyIcon from 'shared/assets/img/copy.svg';
import { Button } from '../Button';
import cls from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo((props: PropsWithChildren<CodeProps>) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button theme='clear' className={cls.copy} onClick={onCopy}>
                <CopyIcon className={cls.icon} />
            </Button>
            <code>{text}</code>
        </pre>
    );
});
