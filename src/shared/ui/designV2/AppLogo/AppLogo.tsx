import { PropsWithChildren, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/designV2/Stack';
import { Text } from '../../deprecated/Text';

interface AppLogoProps {
	className?: string;
}

export const AppLogo = memo((props: PropsWithChildren<AppLogoProps>) => {
	const { className } = props;

	return (
		<HStack max justify='center' className={classNames('', {}, [className])}>
			<Text title='LOGO' />
		</HStack>
	);
});
