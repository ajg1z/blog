import { PropsWithChildren, memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card } from '../Card';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (val: TabItem) => void;
}

export const Tabs = memo((props: PropsWithChildren<TabsProps>) => {
    const { className, tabs, onTabClick, value } = props;

    const onClick = useCallback(
        (val: TabItem) => () => {
            onTabClick(val);
        },
        [onTabClick],
    );

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    key={tab.value}
                    theme={value === tab.value ? 'normal' : 'outline'}
                    className={cls.card}
                    onClick={onClick(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});
