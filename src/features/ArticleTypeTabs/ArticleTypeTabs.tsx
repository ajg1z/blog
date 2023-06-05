import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useMemo } from 'react';
import { TabItem, Tabs } from '@/shared/ui/designV2/Tabs';
import { Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleTypeTabs.module.scss';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';

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
		<ToggleFeatureComponent
			name='isAppRedesigned'
			off={
				<TabsDeprecated
					tabs={tabs}
					value={type}
					onTabClick={onChangeType}
					className={classNames(cls.tabs, {}, [className])}
				/>
			}
			on={
				<Tabs
					tabs={tabs}
					value={type}
					onTabClick={onChangeType}
					className={classNames(cls.tabs, {}, [className])}
				/>
			}
		/>
	);
});
