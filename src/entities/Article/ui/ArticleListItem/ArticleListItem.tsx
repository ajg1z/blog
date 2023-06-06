import { FC, HTMLAttributeAnchorTarget, memo } from 'react';
import { Article } from '../../model/types/article';
// eslint-disable-next-line max-len
import { ArticleView } from '../../model/const/articleConst';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { DeprecatedArticleListItem } from './DeprecatedArticleListItem/DeprecatedArticleListItem';
import { DesignV2ArticleListItem } from './DesignV2ArticleListItem/DesignV2ArticleListItem';

interface ArticleListItemProps {
	className?: string;
	view: ArticleView;
	article: Article;
	target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo((props) => (
	<ToggleFeatureComponent
		name='isAppRedesigned'
		off={<DeprecatedArticleListItem {...props} />}
		on={<DesignV2ArticleListItem {...props} />}
	/>
));
