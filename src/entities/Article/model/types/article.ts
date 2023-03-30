import { User } from 'entities/User';

export type ArticleBlockType = 'text' | 'image' | 'code';

export enum ArticleSortField {
    VIEWS = 'views',
    TITLE = 'title',
    CREATED = 'createdAt',
}

export interface ArticleBlockBase {
    type: ArticleBlockType;
    id: number;
}

export interface ArticleBlockText extends ArticleBlockBase {
    title?: string;
    paragraphs: string[];
    type: 'text';
}

export interface ArticleBlockImage extends ArticleBlockBase {
    title: string;
    src: string;
    type: 'image';
}

export interface ArticleBlockCode extends ArticleBlockBase {
    code: string;
    type: 'code';
}

export type ArticleBlock = ArticleBlockText | ArticleBlockImage | ArticleBlockCode;

export type ArticleType =
    | 'IT'
    | 'SCIENCE'
    | 'ECONOMICS'
    | 'SPACE'
    | 'GAME'
    | 'MATH'
    | 'ALL'
    | 'POLITICS';

export interface Article {
    id: number;
    title: string;
    user: User;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
}

export enum ArticleView {
    LIST = 'LIST',
    TILE = 'TILE',
}
