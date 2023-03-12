import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleBlockTextComponent.module.scss';

interface ArticleBlockTextComponentProps {
    className?: string;
}

export const ArticleBlockTextComponent: FC<ArticleBlockTextComponentProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.articleBlockTextComponent, {}, [className])}>
            ArticleBlockTextComponent
        </div>
    );
};
