import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from '@/entities/Article';
import { getUserData } from '@/entities/User';

export const getCanEdit = createSelector(getUserData, getArticleDetailsData, (user, article) => {
    if (!user || !article) {
        return false;
    }
    return article.user.id === user.id;
});
