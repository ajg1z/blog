import { FC, memo } from 'react';
import cls from './CircleLoader.module.scss';

export const CircleLoader: FC = memo(() => (
    <div className={cls.CircleLoader}>
        <span />
    </div>
));
