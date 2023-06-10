import { PropsWithChildren, memo } from 'react';
import { ArticlesViewSelector } from '@/features/ArticlesViewSelector';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ViewSelectorContainerProps {
	className?: string;
}

export const ViewSelectorContainer = memo((props: PropsWithChildren<ViewSelectorContainerProps>) => {
	const { className } = props;

	const { view, onChangeView } = useArticleFilters();

	return <ArticlesViewSelector className={className} activeView={view} onViewSelect={onChangeView} />;
});
