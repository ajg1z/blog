/* eslint-disable indent */
import { FC, memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Avatar } from '@/shared/ui/Avatar';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';
import { ArticleBlock } from '../../model/types/article';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import {
    getArticleDetailsData,
    getArticleDetailsLoading,
    getArticleDetailsError,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/service/fetchArticleById/fetchArticleById';
import cls from './ArticleDetails.module.scss';
import EyeIcon from '../../../../shared/assets/img/eye.svg';
import CalendarIcon from '../../../../shared/assets/img/calendar.svg';
import { ArticleBlockTextComponent } from './Blocks/ArticleBlockTextComponent/ArticleBlockTextComponent';
import { ArticleBlockCodeComponent } from './Blocks/ArticleBlockCodeComponent/ArticleBlockCodeComponent';
import { ArticleBlockImageComponent } from './Blocks/ArticleBlockImageComponent/ArticleBlockImageComponent';

interface ArticleDetailProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<ArticleDetailProps> = memo((props) => {
    const { className, id } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getArticleDetailsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
            case 'text':
                return (
                    <ArticleBlockTextComponent
                        key={block.id}
                        block={block}
                        className={cls.ArticleBlockText}
                    />
                );
            case 'code':
                return (
                    <ArticleBlockCodeComponent
                        key={block.id}
                        block={block}
                        className={cls.ArticleBlockCode}
                    />
                );
            case 'image':
                return (
                    <ArticleBlockImageComponent
                        key={block.id}
                        block={block}
                        className={cls.ArticleBlockImage}
                    />
                );
            default:
                return null;
        }
    }, []);

    useEffect(() => {
        if (__ENVIRONMENT__ !== 'storybook') dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton width={200} height={200} border='50%' className={cls.avatar} />
                <Skeleton width={300} height={32} className={cls.title} />
                <Skeleton width={600} height={24} className={cls.title} />
                <Skeleton height={200} className={cls.skeleton} />
                <Skeleton height={200} className={cls.skeleton} />
            </>
        );
    } else if (error) {
        content = <Text align='center' theme='error' title={t('errorLoading')} />;
    } else {
        content = (
            <>
                <Avatar className={cls.avatar} src={article?.img} size={200} />
                <Text
                    className={cls.title}
                    title={article?.title}
                    text={article?.subtitle}
                    data-testid='ArticleDetails.text'
                    size='L'
                />
                <HStack gap={12} data-testid='ArticleDetails.views'>
                    <Icon Svg={EyeIcon} />
                    <Text text={String(article?.views)} />
                </HStack>

                <HStack gap={12} data-testid='ArticleDetails.createdAt'>
                    <Icon Svg={CalendarIcon} />
                    <Text text={article?.createdAt} />
                </HStack>
                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <DynamicModuleLoader isRemoveAfterUnmount reducers={reducers}>
            <div className={classNames(cls.ArticleDetails, {}, [className])}>{content}</div>
        </DynamicModuleLoader>
    );
});
