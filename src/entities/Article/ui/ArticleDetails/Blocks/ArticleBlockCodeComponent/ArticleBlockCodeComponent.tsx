import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code as DeprecatedCode } from '@/shared/ui/deprecated/Code';
import { Code } from '@/shared/ui/designV2/Code';
import { ArticleBlockCode } from '../../../../model/types/article';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';

interface ArticleBlockCodeComponentProps {
	className?: string;
	block: ArticleBlockCode;
}

export const ArticleBlockCodeComponent: FC<ArticleBlockCodeComponentProps> = memo((props) => {
	const { className, block } = props;

	return (
		<div className={classNames('', {}, [className])}>
			<ToggleFeatureComponent
				name='isAppRedesigned'
				off={<DeprecatedCode text={block.code} />}
				on={<Code text={block.code} />}
			/>
		</div>
	);
});
