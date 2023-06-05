import { PropsWithChildren, ReactElement, memo } from 'react';
import cls from './StickyContentLayout.module.scss';
import { classNames } from '../../classNames/classNames';

interface StickyContentLayoutProps {
	className?: string;
	right?: ReactElement;
	left?: ReactElement;
	content: ReactElement;
}

export const StickyContentLayout = memo((props: PropsWithChildren<StickyContentLayoutProps>) => {
	const { className, left, right, content } = props;

	return (
		<div className={classNames(cls.layout, {}, [className])}>
			{left && <div className={cls.left}>{left}</div>}
			<div className={cls.content}>{content}</div>
			{right && <div className={cls.right}>{right}</div>}
		</div>
	);
});
