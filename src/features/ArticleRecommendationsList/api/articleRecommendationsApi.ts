import { Article } from 'entities/Article';
import { rtkApi } from 'shared/api/rtkApi';

const articleRecommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _expand: 'user',
                    _limit: limit,
                },
            }),
        }),
    }),
});

export const useArticleRecommendationsList =
    articleRecommendationsApi.useGetArticleRecommendationsListQuery;
