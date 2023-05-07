import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { RotatingLinesLoader } from '@/shared/ui/Loaders';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader: FC<PageLoaderProps> = memo(({ className }) => (
    <div className={classNames(cls.PageLoader, {}, [className])}>
        <RotatingLinesLoader width='80px' />
    </div>
));
