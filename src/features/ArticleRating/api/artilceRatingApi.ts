import { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating, { userId: number; articleId: string }>({
            query: ({ articleId, userId }) => ({
                url: '/article-ratings',
                params: {
                    userId,
                    articleId,
                },
            }),
        }),
    }),
});

export const useArticleRating = articleRatingApi.useGetArticleRatingQuery;
