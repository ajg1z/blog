import { useState, FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { useSelector } from 'react-redux';
import cls from './Sidebar.module.scss';
import { getSidebarLinkList } from '../../model/selectors/getSidebarList';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
    className?: string;
}

export const Sidebar: FC<SidebarProps> = memo((props) => {
    const { className } = props;

    const [collapsed, setCollapsed] = useState(false);
    const sidebarListLink = useSelector(getSidebarLinkList);

    async function onToggle() {
        setCollapsed((state) => !state);
    }

    return (
        <div
            aria-label='sidebar'
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <Button
                theme='backgroundInverted'
                className={cls.collapseBtn}
                data-testid='toggle-btn'
                onClick={onToggle}
                square
                size='L'
            >
                {collapsed ? '>' : '<'}
            </Button>

            <div className={cls.items}>
                {sidebarListLink.map((item) => (
                    <SidebarItem item={item} key={item.path} />
                ))}
            </div>

            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher isShort={collapsed} />
            </div>
        </div>
    );
});
