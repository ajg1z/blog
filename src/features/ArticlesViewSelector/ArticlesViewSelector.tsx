import type { PropsWithChildren } from 'react';
import ListIcon from '@/shared/assets/img/list.svg';
import TileIcon from '@/shared/assets/img/tile.svg';
import { ArticleView } from '@/entities/Article';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Button } from '@/shared/ui/deprecated/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesViewSelector.module.scss';

interface ArticleViewSelectorProps {
	className?: string;
	activeView?: ArticleView;
	onViewSelect?: (view: ArticleView) => void;
}

const viewTypes = [
	{
		view: ArticleView.LIST,
		icon: ListIcon,
	},
	{
		view: ArticleView.TILE,
		icon: TileIcon,
	},
];

export function ArticlesViewSelector(props: PropsWithChildren<ArticleViewSelectorProps>) {
	const { className, onViewSelect, activeView } = props;

	return (
		<div className={classNames(cls.ArticleViewSelector, {}, [className])}>
			{viewTypes.map(({ icon, view }) => (
				<Button
					data-testid={`ArticlesViewSelector.${view}`}
					theme='clear'
					key={view}
					className={classNames('', { [cls.activeView]: view === activeView }, [])}
					onClick={() => onViewSelect?.(view)}
				>
					<Icon width={24} height={24} Svg={icon} />
				</Button>
			))}
		</div>
	);
}
