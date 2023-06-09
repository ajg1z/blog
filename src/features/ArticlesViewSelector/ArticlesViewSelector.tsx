import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import ListIcon from '@/shared/assets/img/list.svg';
import TileIcon from '@/shared/assets/img/tile.svg';
import { ArticleView } from '@/entities/Article';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesViewSelector.module.scss';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';
import { IconButton } from '@/shared/ui/designV2/Icon/IconButton';
import { HStack } from '@/shared/ui/designV2/Stack';
import { Card } from '@/shared/ui/designV2/Card';
import { Text } from '@/shared/ui/designV2/Text';

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

	const { t } = useTranslation();

	return (
		<ToggleFeatureComponent
			name='isAppRedesigned'
			off={
				<div className={classNames(cls.ArticleViewSelector, {}, [className])}>
					{viewTypes.map(({ icon, view }) => (
						<ButtonDeprecated
							data-testid={`ArticlesViewSelector.${view}`}
							theme='clear'
							key={view}
							className={classNames(cls.viewIconBtn, { [cls.activeView]: view === activeView }, [])}
							onClick={() => onViewSelect?.(view)}
						>
							<IconDeprecated width={24} height={24} Svg={icon} />
						</ButtonDeprecated>
					))}
				</div>
			}
			on={
				<Card className={cls.ArticleViewSelectorDesignV2}>
					<HStack gap={4} className={classNames('', {}, [className])}>
						<Text text={t('typeView')} className={cls.label} />
						{viewTypes.map(({ icon, view }) => (
							<IconButton
								key={view}
								data-testid={`ArticlesViewSelector.${view}`}
								Svg={icon}
								width={24}
								height={24}
								className={classNames(cls.viewIconBtn, { [cls.activeView]: view === activeView }, [])}
								onClick={() => onViewSelect?.(view)}
							/>
						))}
					</HStack>
				</Card>
			}
		/>
	);
}
