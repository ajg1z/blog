import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { CircleLoader } from '@/shared/ui/CircleLoader';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader: FC<PageLoaderProps> = memo(({ className }) => (
    <div className={classNames(cls.PageLoader, {}, [className])}>
        <CircleLoader />
    </div>
));
