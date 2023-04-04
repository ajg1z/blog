import { useState, FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { useSelector } from 'react-redux';
import { HStack, VStack } from 'shared/ui/Stack';
import { SidebarItem } from '../../ui/SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';
import { getSidebarLinkList } from '../../model/selectors/getSidebarList';

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
        <menu
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

            <VStack className={cls.items} gap={24}>
                {sidebarListLink.map((item) => (
                    <SidebarItem item={item} key={item.path} />
                ))}
            </VStack>

            <HStack className={cls.switchers} gap={8} max justify='center'>
                <ThemeSwitcher />
                <LangSwitcher isShort={collapsed} />
            </HStack>
        </menu>
    );
});
