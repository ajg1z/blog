import { classNames } from 'shared/lib/classNames/classNames';
import { FC, memo } from 'react';
import { Button } from 'shared/ui/Button';
import { useTranslation } from 'react-i18next';

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
        <Button theme='clear' className={classNames('', {}, [className])} onClick={onToggle}>
            {isShort ? t('short_lan') : t('lan')}
        </Button>
    );
});
