import { CSSProperties, ImgHTMLAttributes, memo, PropsWithChildren, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../../designV2/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Icon } from '../Icon';
import UserIcon from '@/shared/assets/img/user.svg';

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
		<AppImage
			{...otherProps}
			className={classNames(cls.avatar, {}, [className])}
			alt={alt}
			style={styles}
			fallback={
				<Skeleton className={classNames(cls.avatar, {}, [className])} height={size} width={size} border='50%' />
			}
			errorFallback={
				<Icon className={classNames(cls.avatar, {}, [className])} width={size} height={size} Svg={UserIcon} />
			}
		/>
	);
});
