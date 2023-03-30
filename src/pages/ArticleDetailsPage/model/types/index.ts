import { ArticleDetailsRecommendationsSchema } from './articleDetailsRecommendations';
import { ArticleDetailsCommentsSchema } from './comments';

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentsSchema;
    recommendations: ArticleDetailsRecommendationsSchema;
}
