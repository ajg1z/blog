import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { RotatingLinesLoader as DeprecatedRotatingLinesLoader } from '@/shared/ui/deprecated/Loaders';
import { RotatingLinesLoader } from '@/shared/ui/designV2/Loaders';
import cls from './PageLoader.module.scss';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';

interface PageLoaderProps {
	className?: string;
}

export const PageLoader: FC<PageLoaderProps> = memo(({ className }) => (
	<div className={classNames(cls.PageLoader, {}, [className])}>
		<ToggleFeatureComponent
			name='isAppRedesigned'
			off={<DeprecatedRotatingLinesLoader width='80px' />}
			on={<RotatingLinesLoader width='80px' />}
		/>
	</div>
));
