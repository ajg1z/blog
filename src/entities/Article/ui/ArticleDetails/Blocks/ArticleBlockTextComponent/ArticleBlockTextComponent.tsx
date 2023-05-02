import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text';
import { ArticleBlockText } from '../../../../model/types/article';
import cls from './ArticleBlockTextComponent.module.scss';

interface ArticleBlockTextComponentProps {
    className?: string;
    block: ArticleBlockText;
}

export const ArticleBlockTextComponent: FC<ArticleBlockTextComponentProps> = memo((props) => {
    const { className, block } = props;

    return (
        <div className={classNames(cls.ArticleBlockTextComponent, {}, [className])}>
            {block.title && <Text title={block.title} className={cls.title} />}
            {block.paragraphs.map((p, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Text key={`${p}${index}`} text={p} className={cls.paragraph} />
            ))}
        </div>
    );
});
