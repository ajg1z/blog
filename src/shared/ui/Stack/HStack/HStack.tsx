import { PropsWithChildren, memo } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

interface HStackProps extends Omit<FlexProps, 'direction'> {
    className?: string;
}

export const HStack = memo((props: PropsWithChildren<HStackProps>) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Flex direction='row' {...props} />
));
