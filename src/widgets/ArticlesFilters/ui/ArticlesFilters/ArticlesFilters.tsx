import { AiOutlineSearch } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo } from 'react';
import cls from './ArticlesFilters.module.scss';
import { VStack } from '@/shared/ui/designV2/Stack';
import { Card } from '@/shared/ui/designV2/Card';
import { Input } from '@/shared/ui/designV2/Input';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticlesSortSelector } from '@/features/ArticlesSortSelector';
import { TabItem } from '@/shared/ui/designV2/Tabs';
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/designV2/Icon';
import { ArticlesViewSelector } from '@/features/ArticlesViewSelector';

interface ArticlesFiltersProps {
	className?: string;
	search: string;
	onChangeSearch: (value: string) => void;
	onChangeType: (tab: TabItem) => void;
	type: ArticleType;
	order: SortOrder;
	sort: ArticleSortField;
	view: ArticleView;
	onChangeView: (view: ArticleView) => void;
	onChangeSort: (val: ArticleSortField) => void;
	onChangeSortOrder: (val: SortOrder) => void;
}

export const ArticlesFilters = memo((props: PropsWithChildren<ArticlesFiltersProps>) => {
	const {
		className,
		onChangeSort,
		onChangeSortOrder,
		onChangeType,
		order,
		search,
		view,
		onChangeView,
		sort,
		type,
		onChangeSearch,
	} = props;

	const { t } = useTranslation();

	return (
		<Card className={cls.ArticlesFilters}>
			<VStack gap={24} className={classNames('', {}, [className])}>
				<Input
					value={search}
					placeholder={`${t('search')}...`}
					data-testid='ArticlesPageFilters.Search'
					addonLeft={<Icon Svg={AiOutlineSearch} />}
					onChangeValue={onChangeSearch}
				/>
				<ArticleTypeTabs type={type} className={cls.tabs} onChangeType={onChangeType} />
				<ArticlesSortSelector
					order={order}
					sort={sort}
					onChangeSort={onChangeSort}
					onChangeSortOrder={onChangeSortOrder}
				/>
				<ArticlesViewSelector activeView={view} onViewSelect={onChangeView} />
			</VStack>
		</Card>
	);
});
