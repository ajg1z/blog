import { FC, memo } from 'react';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { VStack } from '@/shared/ui/designV2/Stack';
import { Text } from '@/shared/ui/designV2/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { ArticleBlockText } from '../../../../model/types/article';

interface ArticleBlockTextComponentProps {
	className?: string;
	block: ArticleBlockText;
}

export const ArticleBlockTextComponent: FC<ArticleBlockTextComponentProps> = memo((props) => {
	const { className, block } = props;

	return (
		<VStack gap={8} className={classNames('', {}, [className])}>
        					{block.title && <Text title={block.title} />}
        					{block.paragraphs.map((p, index) => (
        						// eslint-disable-next-line react/no-array-index-key
        						<Text key={`${p}${index}`} text={p} />
        					))}
        				</VStack>
	);
});
