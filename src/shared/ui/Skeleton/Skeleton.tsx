import { CSSProperties, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
}

export const Skeleton: FC<SkeletonProps> = (props) => {
    const { className, border, height, width } = props;

    const styles: CSSProperties = {
        borderRadius: border,
        width,
        height,
    };

    return <div style={styles} className={classNames(cls.Skeleton, {}, [className])} />;
};
