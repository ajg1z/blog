import { FC, memo, VFC, SVGProps, HTMLAttributes } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	Svg: VFC<SVGProps<SVGSVGElement>>;
	width?: number;
	height?: number;
}

export const Icon: FC<IconProps> = memo((props) => {
	const { className, Svg, width, height, ...divProps } = props;

	const iconStyles = {
		width,
		height,
	};

	return (
		<div {...divProps} className={classNames(cls.wrapperIcon, {}, [className])}>
			<Svg style={iconStyles} className={cls.icon} />
		</div>
	);
});
