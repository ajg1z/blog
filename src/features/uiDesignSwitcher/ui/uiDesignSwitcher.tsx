import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PropsWithChildren, memo, useState } from 'react';
import { ListBox as DeprecatedListBox, ListBoxItem } from '@/shared/ui/deprecated/ListBox';
import { ListBox } from '@/shared/ui/designV2/ListBox';
import { ToggleFeatureComponent, getFeatureFlag, updateFeatureFlags } from '@/shared/lib/featureFlags';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserData } from '@/entities/User';
import { HStack } from '@/shared/ui/designV2/Stack';
import { CircleLoader as DeprecatedCircleLoader } from '@/shared/ui/deprecated/CircleLoader';
import { CircleLoader } from '@/shared/ui/designV2/CircleLoader';

interface uiDesignSwitcherProps {
	className?: string;
}

export const UIDesignSwitcher = memo((props: PropsWithChildren<uiDesignSwitcherProps>) => {
	const { className } = props;

	const { t } = useTranslation('settings');
	const dispatch = useAppDispatch();

	const isAppRedesigned = getFeatureFlag('isAppRedesigned');

	const userData = useSelector(getUserData);

	const [isLoading, setIsLoading] = useState(false);

	const items: ListBoxItem<string>[] = [
		{
			value: 'old',
			content: t('old'),
		},
		{
			value: 'new',
			content: t('new'),
		},
	];

	const onChangeDesign = async (value: string) => {
		if (userData) {
			setIsLoading(true);

			await dispatch(
				updateFeatureFlags({
					userId: userData.id,
					features: {
						isAppRedesigned: value === 'new',
					},
				}),
			);

			setIsLoading(false);
			window.location.reload();
		}
	};

	const value = isAppRedesigned ? 'new' : 'old';

	return (
		<HStack align='start' gap={12} className={className}>
			<ListBox value={value} items={items} onChange={onChangeDesign} />

			{isLoading && (
				<CircleLoader />
			)}
		</HStack>
	);
});
