import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useMemo } from 'react';
import { Select, SelectOption } from 'shared/ui/Select';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleSortField } from 'entities/Article';
import { SortOrder } from 'shared/types';
import cls from './ArticlesSortSelector.module.scss';

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

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            { content: commonT('decreasing'), value: 'asc' },
            { content: commonT('increasing'), value: 'desc' },
        ],
        [commonT],
    );

    const sortOptions = useMemo<SelectOption<ArticleSortField>[]>(
        () => [
            { content: t('sortByDate'), value: ArticleSortField.CREATED },
            { content: t('sortByTitle'), value: ArticleSortField.TITLE },
            { content: t('sortByViews'), value: ArticleSortField.VIEWS },
        ],
        [t],
    );

    return (
        <div className={classNames(cls.ArticlesSortSelector, {}, [className])}>
            <Select
                label={commonT('sortBy')}
                value={sort}
                onChange={onChangeSort}
                options={sortOptions}
            />
            <Select value={order} onChange={onChangeSortOrder} options={orderOptions} />
        </div>
    );
});
