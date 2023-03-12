export type ArticleBlockType = 'text' | 'code' | 'image';

export interface ArticleBlockBase {
    type: ArticleBlockType;
    id: number;
}

export interface ArticleBlockText extends ArticleBlockBase {
    title?: string;
    paragraphs: string[];
}

export interface ArticleBlockImage extends ArticleBlockBase {
    title: string;
    src: string;
}

export interface ArticleBlockCode extends ArticleBlockBase {
    code: string;
}

export type ArticleBlock = ArticleBlockText | ArticleBlockImage | ArticleBlockCode;

export type ArticleType = 'IT' | 'SCIENCE' | 'ECONOMICS' | 'SPACE' | 'GAME' | 'MATH';

export interface Article {
    id: number;
    title: string;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
}
