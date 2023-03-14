import { FC, memo, VFC, SVGProps } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    Svg: VFC<SVGProps<SVGSVGElement>>;
}

export const Icon: FC<IconProps> = memo((props) => {
    const { className, Svg } = props;

    return (
        <div className={classNames(cls.wrapperIcon, {}, [className])}>
            <Svg className={cls.icon} />
        </div>
    );
});
