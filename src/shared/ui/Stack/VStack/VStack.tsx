import { PropsWithChildren, memo } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

interface VStackProps extends Omit<FlexProps, 'direction'> {
    className?: string;
}

export const VStack = memo((props: PropsWithChildren<VStackProps>) => {
    const { className, align = 'start', ...otherProps } = props;

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Flex {...otherProps} className={className} direction='column' align={align} />;
});
