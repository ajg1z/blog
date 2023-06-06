import { memo, PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

type TextVariant = 'primary' | 'error' | 'accent';
type TextAlign = 'left' | 'center' | 'right';
type TextSize = 'M' | 'L' | 'S';
type HeaderTag = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTag> = {
	S: 'h3',
	M: 'h2',
	L: 'h1',
};

interface TextProps {
	className?: string;
	text?: string;
	title?: string;
	variant?: TextVariant;
	align?: TextAlign;
	size?: TextSize;
	'data-testid'?: string;
	bold?: boolean;
}

export const Text = memo((props: PropsWithChildren<TextProps>) => {
	const {
		className,
		text,
		title,
		align = 'left',
		variant = 'primary',
		size = 'M',
		'data-testid': dataTestId = 'Text',
		bold,
	} = props;

	const HeaderTag = mapSizeToHeaderTag[size];

	return (
		<div
			data-testid={dataTestId}
			className={classNames(cls.Text, { [cls.bold]: Boolean(bold) }, [
				className,
				cls[variant],
				cls[align],
				cls[size],
			])}
		>
			{title && (
				<HeaderTag data-testid={`${dataTestId}.Header`} className={cls.title}>
					{title}
				</HeaderTag>
			)}

			{text && (
				<p data-testid={`${dataTestId}.Paragraph`} className={cls.text}>
					{text}
				</p>
			)}
		</div>
	);
});
