import { PropsWithChildren, memo } from 'react';
import { IconButton } from '@/shared/ui/designV2/Icon';
import { FaArrowUp } from 'react-icons/fa';

interface ScrollToTopButtonProps {
	className?: string;
}

export const ScrollToTopButton = memo((props: PropsWithChildren<ScrollToTopButtonProps>) => {
	const { className } = props;

	const onScrollTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return <IconButton className={className} Svg={FaArrowUp} onClick={onScrollTop} />;
});
