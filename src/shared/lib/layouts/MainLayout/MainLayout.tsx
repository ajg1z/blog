import { PropsWithChildren, memo, ReactElement } from 'react';
import cls from './MainLayout.module.scss';
import { classNames } from '../../classNames/classNames';

interface MainLayoutProps {
	className?: string;
	header: ReactElement;
	content: ReactElement;
	sidebar: ReactElement;
	toolbar?: ReactElement;
}

export const MainLayout = memo((props: PropsWithChildren<MainLayoutProps>) => {
	const { className, content, header, sidebar, toolbar } = props;

	return (
		<div className={classNames(cls.MainLayout, {}, [className])}>
			<div className={cls.sidebar}>{sidebar}</div>
			<div className={cls.content}>{content}</div>
			<div className={cls.rightbar}>
				<div className={cls.header}>{header}</div>
				<div className={cls.toolbar}>{toolbar}</div>
			</div>
		</div>
	);
});
