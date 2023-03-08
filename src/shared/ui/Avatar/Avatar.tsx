import { CSSProperties, ImgHTMLAttributes, memo, PropsWithChildren, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    size?: number;
}

export const Avatar = memo((props: PropsWithChildren<AvatarProps>) => {
    const { className, size = 100, style, alt, ...otherProps } = props;

    const styles = useMemo<CSSProperties>(
        () => ({
            ...style,
            height: size,
            width: size,
        }),
        [size, style],
    );

    return (
        <img
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
            className={classNames(cls.avatar, {}, [className])}
            alt={alt}
            style={styles}
        />
    );
});
