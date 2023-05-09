import { PropsWithChildren, memo } from 'react';
import { RotatingLines } from 'react-loader-spinner';

interface RotatingLinesLoaderProps {
    width?: string;
}

export const RotatingLinesLoader = memo((props: PropsWithChildren<RotatingLinesLoaderProps>) => {
    const { width } = props;

    return (
        <RotatingLines width={width} strokeColor='var(--primary-color)' animationDuration='200ms' />
    );
});
