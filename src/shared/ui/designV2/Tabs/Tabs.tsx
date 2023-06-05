import { PropsWithChildren, memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '@/shared/ui/designV2/Card';
import { Flex, Direction } from '../Stack';

export interface TabItem {
	value: string;
	content: ReactNode;
}

interface TabsProps {
	className?: string;
	tabs: TabItem[];
	value: string;
	direction?: Direction;
	onTabClick: (val: TabItem) => void;
}

export const Tabs = memo((props: PropsWithChildren<TabsProps>) => {
	const { className, tabs, onTabClick, value, direction = 'row' } = props;

	const onClick = useCallback(
		(val: TabItem) => () => {
			onTabClick(val);
		},
		[onTabClick],
	);

	return (
		<Flex gap={8} direction={direction} className={classNames(cls.Tabs, {}, [className])}>
			{tabs.map((tab) => (
				<Card
					data-testid={`Tab.${tab.value}`}
					key={tab.value}
					variant={value === tab.value ? 'light' : 'normal'}
					className={cls.card}
					onClick={onClick(tab)}
				>
					{tab.content}
				</Card>
			))}
		</Flex>
	);
});
