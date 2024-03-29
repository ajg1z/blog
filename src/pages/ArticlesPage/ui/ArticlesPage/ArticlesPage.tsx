/* eslint-disable max-len */
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { PageWrapper } from '@/widgets/PageWrapper';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { StickyContentLayout } from '@/shared/lib/layouts/StickyContentLayout';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = (props) => {
	const { className } = props;
	const dispatch = useAppDispatch();

	const [searchParams] = useSearchParams();

	useInitialEffect(() => {
		dispatch(initArticlesPage(searchParams));
	});

	return (
		<DynamicModuleLoader reducers={reducers}>
			<StickyContentLayout
            						right={<FiltersContainer />}
            						content={
            							<PageWrapper data-testid='ArticlesPage' className={cls.page} saveScrollPosition={false}>
            								<div className={classNames(cls.ArticlesPage, {}, [className])}>
            									<ArticleInfiniteList />
            								</div>
            							</PageWrapper>
            						}
            					/>
		</DynamicModuleLoader>
	);
};

export default ArticlesPage;
