import { FC, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Text } from 'shared/ui/Text';
import { Skeleton } from 'shared/ui/Skeleton';
import { articleDetailReducer } from '../../model/slice/articleDetailSlice';
import {
    getArticleDetailsData,
    getArticleDetailsLoading,
    getArticleDetailsError,
} from '../../model/selectors/articleDetail';
import { fetchArticleById } from '../../model/service/fetchArticleById/fetchArticleById';
import cls from './ArticleDetail.module.scss';

interface ArticleDetailProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    articleDetail: articleDetailReducer,
};

export const ArticleDetail: FC<ArticleDetailProps> = memo((props) => {
    const { className, id } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getArticleDetailsLoading);
    const data = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
        dispatch(fetchArticleById(id));
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
        content = <Text align='center' theme='error' title={t('error-loading')} />;
    } else {
        content = <div className={classNames(cls.ArticleDetail, {}, [className])}>1</div>;
    }

    return (
        <DynamicModuleLoader isRemoveAfterUnmount reducers={reducers}>
            {content}
        </DynamicModuleLoader>
    );
});
