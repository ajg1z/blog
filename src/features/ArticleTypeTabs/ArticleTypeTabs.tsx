import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useMemo } from 'react';
import { TabItem, Tabs } from 'shared/ui/Tabs';
import { ArticleType } from 'entities/Article';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleTypeTAbs.module.scss';

interface ArticleTypeTAbsProps {
    className?: string;
    onChangeType: (tab: TabItem) => void;
    type: ArticleType;
}

export const ArticleTypeTabs = memo((props: PropsWithChildren<ArticleTypeTAbsProps>) => {
    const { className, onChangeType, type } = props;
    const { t } = useTranslation('articles');

    const tabs: TabItem[] = useMemo(
        () => [
            {
                value: 'ALL',
                content: t('tabs.all'),
            },
            {
                value: 'IT',
                content: t('tabs.it'),
            },
            {
                value: 'ECONOMICS',
                content: t('tabs.economics'),
            },
            {
                value: 'POLITICS',
                content: t('tabs.politics'),
            },
            {
                value: 'SCIENCE',
                content: t('tabs.science'),
            },
        ],
        [t],
    );

    return (
        <Tabs
            tabs={tabs}
            value={type}
            onTabClick={onChangeType}
            className={classNames(cls.tabs, {}, [className])}
        />
    );
});
