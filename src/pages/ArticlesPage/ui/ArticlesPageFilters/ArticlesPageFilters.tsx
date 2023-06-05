import { memo, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticlesViewSelector } from '@/features/ArticlesViewSelector';
import { Input } from '@/shared/ui/deprecated/Input';
import { ArticlesSortSelector } from '@/features/ArticlesSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { HStack } from '@/shared/ui/designV2/Stack';
import cls from './ArticlesPageFilters.module.scss';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ArticleViewSelectorProps {
	className?: string;
}

export const ArticlesPageFilters = memo((props: PropsWithChildren<ArticleViewSelectorProps>) => {
	const { className } = props;
	const { t: commonT } = useTranslation();

	const { onChangeOrder, onChangeSearch, onChangeSort, onChangeType, onChangeView, order, search, sort, type, view } =
		useArticleFilters();

	return (
		<div className={classNames(cls.ArticleViewSelector, {}, [className])}>
			<HStack justify='space-between' className={cls.sortWrapper}>
				<ArticlesSortSelector
					order={order}
					sort={sort}
					onChangeSort={onChangeSort}
					onChangeSortOrder={onChangeOrder}
				/>
				<ArticlesViewSelector activeView={view} onViewSelect={onChangeView} />
			</HStack>
			<Input
				value={search}
				onChangeValue={onChangeSearch}
				theme='outline'
				placeholder={`${commonT('search')}...`}
				className={cls.search}
				data-testid='ArticlesPageFilters.Search'
			/>
			<ArticleTypeTabs type={type} onChangeType={onChangeType} className={cls.tabs} />
		</div>
	);
});
