import { PropsWithChildren, memo } from 'react';
import { ThreeDots } from 'react-loader-spinner';

interface ThreeDotsLoaderProps {
	width?: string;
}

export const ThreeDotsLoader = memo((props: PropsWithChildren<ThreeDotsLoaderProps>) => {
	const { width } = props;

	return <ThreeDots width={width} color='var(--accent-design-v2)' />;
});
