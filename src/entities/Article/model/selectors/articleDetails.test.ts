import { StateSchema } from '@/app/providers/StoreProvider';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsLoading,
} from './articleDetails';

describe('getArticleDetailsData', () => {
    test('should return data', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: {
                    id: 1,
                    subtitle: 'subtitle',
                    title: 'Title',
                    views: 10,
                },
            },
        };

        expect(getArticleDetailsData(state as StateSchema)).toEqual(state.articleDetails?.data);
    });
});

describe('getArticleDetailsError', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: { error: 'error' },
        };

        expect(getArticleDetailsError(state as StateSchema)).toEqual(state.articleDetails?.error);
    });
});

describe('getArticleDetailsLoading', () => {
    test('should return loading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: { isLoading: true },
        };

        expect(getArticleDetailsLoading(state as StateSchema)).toEqual(
            state.articleDetails?.isLoading,
        );
    });
});
