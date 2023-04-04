import { ErrorInfo, FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string;
    info?: string | object | ErrorInfo;
}

export const PageError: FC<PageErrorProps> = memo((props) => {
    const { t } = useTranslation();

    const { className, info } = props;

    function reloadPage() {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

    function printInfoError() {
        if (typeof info === 'string') return info;
        return JSON.stringify(info, undefined, 2);
    }

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <p>{t('pageError')}</p>
            <Button onClick={reloadPage}>{t('reloadPage')}</Button>

            {info && <div className={cls.infoLog}>{printInfoError()}</div>}
        </div>
    );
});
