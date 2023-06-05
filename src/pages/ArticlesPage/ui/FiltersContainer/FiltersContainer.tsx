import { PropsWithChildren, memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';

import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
	className?: string;
}

export const FiltersContainer = memo((props: PropsWithChildren<FiltersContainerProps>) => {
	const { className } = props;

	const { onChangeOrder, onChangeSearch, onChangeSort, onChangeType, order, search, sort, type, onChangeView, view } =
		useArticleFilters();

	return (
		<ArticlesFilters
			className={className}
			order={order}
			search={search}
			sort={sort}
			type={type}
			view={view}
			onChangeSearch={onChangeSearch}
			onChangeSort={onChangeSort}
			onChangeSortOrder={onChangeOrder}
			onChangeType={onChangeType}
			onChangeView={onChangeView}
		/>
	);
});
