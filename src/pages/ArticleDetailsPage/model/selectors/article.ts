import { getArticleDetailsData } from 'entities/Article';
import { getUserData } from 'entities/User';
import { createSelector } from '@reduxjs/toolkit';

export const getCanEdit = createSelector(getUserData, getArticleDetailsData, (user, article) => {
    if (!user || !article) {
        return false;
    }
    return article.user.id === user.id;
});
