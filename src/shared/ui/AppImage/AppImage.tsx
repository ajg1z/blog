import {
    ImgHTMLAttributes,
    PropsWithChildren,
    ReactElement,
    memo,
    useLayoutEffect,
    useState,
} from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

export const AppImage = memo((props: PropsWithChildren<AppImageProps>) => {
    const { className, alt = 'image', src, errorFallback, fallback, ...imageProps } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';

        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsError(true);
            setIsLoading(false);
        };
    }, [src]);

    if (errorFallback && isError) {
        return errorFallback;
    }

    if (fallback && isLoading) {
        return fallback;
    }

    return <img className={className} alt={alt} src={src} {...imageProps} />;
});
