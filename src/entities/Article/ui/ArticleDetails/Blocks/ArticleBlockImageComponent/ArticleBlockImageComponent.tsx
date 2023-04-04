import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import { ArticleBlockImage } from '../../../../model/types/article';
import cls from './ArticleBlockImageComponent.module.scss';

interface ArticleBlockImageComponentProps {
    className?: string;
    block: ArticleBlockImage;
}

export const ArticleBlockImageComponent: FC<ArticleBlockImageComponentProps> = memo((props) => {
    const { className, block } = props;

    return (
        <div className={classNames(cls.ArticleBlockImageComponent, {}, [className])}>
            <img className={cls.image} src={block.src} alt={block.title} />
            {block.title && <Text align='center' text={block.title} />}
        </div>
    );
});
