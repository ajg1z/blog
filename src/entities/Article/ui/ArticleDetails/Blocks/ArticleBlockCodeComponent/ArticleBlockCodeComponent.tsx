import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/deprecated/Code';
import { ArticleBlockCode } from '../../../../model/types/article';

interface ArticleBlockCodeComponentProps {
	className?: string;
	block: ArticleBlockCode;
}

export const ArticleBlockCodeComponent: FC<ArticleBlockCodeComponentProps> = memo((props) => {
	const { className, block } = props;

	return (
		<div className={classNames('', {}, [className])}>
			<Code text={block.code} />
		</div>
	);
});
