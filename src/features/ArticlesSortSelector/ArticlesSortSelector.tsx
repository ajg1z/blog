import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useMemo } from 'react';
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import { ListBox as ListBoxDeprecated, ListBoxItem } from '@/shared/ui/deprecated/ListBox';
import { ListBox } from '@/shared/ui/designV2/ListBox';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { HStack, VStack } from '@/shared/ui/designV2/Stack';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { IconButton } from '@/shared/ui/designV2/Icon/IconButton';
import { Text } from '@/shared/ui/designV2/Text';

interface ArticlesSortSelectorProps {
	className?: string;
	order: SortOrder;
	sort: ArticleSortField;
	onChangeSort: (val: ArticleSortField) => void;
	onChangeSortOrder: (val: SortOrder) => void;
}

export const ArticlesSortSelector = memo((props: PropsWithChildren<ArticlesSortSelectorProps>) => {
	const { className, onChangeSort, onChangeSortOrder, order, sort } = props;
	const { t: commonT } = useTranslation();
	const { t } = useTranslation('articles');

	const orderOptions = useMemo<ListBoxItem<SortOrder>[]>(
		() => [
			{ content: commonT('decreasing'), value: 'asc' },
			{ content: commonT('increasing'), value: 'desc' },
		],
		[commonT],
	);

	const sortOptions = useMemo<ListBoxItem<ArticleSortField>[]>(
		() => [
			{ content: t('sortByDate'), value: ArticleSortField.CREATED },
			{ content: t('sortByTitle'), value: ArticleSortField.TITLE },
			{ content: t('sortByViews'), value: ArticleSortField.VIEWS },
		],
		[t],
	);

	const onClickSortOrder = () => {
		onChangeSortOrder(order === 'asc' ? 'desc' : 'asc');
	};

	return (
		<ToggleFeatureComponent
			name='isAppRedesigned'
			off={
				<HStack gap={12} className={classNames('', {}, [className])}>
					<ListBoxDeprecated<ArticleSortField>
						label={commonT('sortBy')}
						value={sort}
						onChange={onChangeSort}
						items={sortOptions}
					/>
					<ListBoxDeprecated<SortOrder> value={order} onChange={onChangeSortOrder} items={orderOptions} />
				</HStack>
			}
			on={
				<VStack gap={12} className={classNames('', {}, [className])}>
					<Text text={commonT('sortBy')} />
					<HStack gap={8}>
						<ListBox<ArticleSortField> value={sort} onChange={onChangeSort} items={sortOptions} />
						<IconButton Svg={order === 'asc' ? BiSortDown : BiSortUp} onClick={onClickSortOrder} />
					</HStack>
				</VStack>
			}
		/>
	);
});
