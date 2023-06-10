import { FC, memo } from 'react';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { DeprecatedArticleDetails } from './DeprecatedArticleDetails/DeprecatedArticleDetails';
import { DesignV2ArticleDetails } from './DesignV2ArticleDetails/DesignV2ArticleDetails';

interface ArticleDetailProps {
	className?: string;
	id: string;
}

export const ArticleDetails: FC<ArticleDetailProps> = memo((props) => (
	<DesignV2ArticleDetails {...props} />
));
