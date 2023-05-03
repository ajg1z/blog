import { ButtonHTMLAttributes, PropsWithChildren, SVGProps, VFC, memo } from 'react';
import cls from './Icon.module.scss';
import { Button } from '../Button';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    Svg: VFC<SVGProps<SVGSVGElement>>;
    width?: number;
    height?: number;
}

export const IconButton = memo((props: PropsWithChildren<IconButtonProps>) => {
    const { className, Svg, width, height, ...buttonProps } = props;

    const iconStyles = {
        width,
        height,
    };

    return (
        <Button
            theme='clear'
            {...buttonProps}
            className={classNames(cls.wrapperIcon, {}, [className])}
        >
            <Svg style={iconStyles} className={cls.icon} />
        </Button>
    );
});
