import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleBlockCodeComponent.module.scss';

interface ArticleBlockCodeComponentProps {
    className?: string;
}

export const ArticleBlockCodeComponent: FC<ArticleBlockCodeComponentProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.articleBlockCodeComponent, {}, [className])}>
            ArticleBlockCodeComponent
        </div>
    );
};
