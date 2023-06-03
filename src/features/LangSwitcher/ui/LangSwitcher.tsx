import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/designV2/Button';
import { ToggleFeatureComponent } from '@/shared/lib/featureFlags';

interface LangSwitcherProps {
	className?: string;
	isShort?: boolean;
}

export const LangSwitcher: FC<LangSwitcherProps> = memo(({ className, isShort }) => {
	const { i18n, t } = useTranslation();

	function onToggle() {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	}

	return (
		<ToggleFeatureComponent
			name='isAppRedesigned'
			off={
				<ButtonDeprecated theme='clear' className={classNames('', {}, [className])} onClick={onToggle}>
					{isShort ? t('shortLan') : t('lan')}
				</ButtonDeprecated>
			}
			on={
				<Button variant='clear' className={classNames('', {}, [className])} onClick={onToggle}>
					{isShort ? t('shortLan') : t('lan')}
				</Button>
			}
		/>
	);
});
