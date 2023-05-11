import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useMemo } from 'react';
import { ListBox, ListBoxItem } from '@/shared/ui/ListBox';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { HStack } from '@/shared/ui/Stack';

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

    return (
        <HStack gap={12} className={classNames('', {}, [className])}>
            <ListBox<ArticleSortField>
                label={commonT('sortBy')}
                value={sort}
                onChange={onChangeSort}
                items={sortOptions}
            />
            <ListBox<SortOrder> value={order} onChange={onChangeSortOrder} items={orderOptions} />
        </HStack>
    );
});
