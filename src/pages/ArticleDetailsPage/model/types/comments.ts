import { EntityState } from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comment';

export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
    isLoading: boolean;
    fetchCommentsError?: string;
    sendCommentError?: string;
}
