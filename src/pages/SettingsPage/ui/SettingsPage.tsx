import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo } from 'react';
import { PageWrapper } from '@/widgets/PageWrapper';
import { VStack } from '@/shared/ui/designV2/Stack';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Text as DesignV2Text } from '@/shared/ui/designV2/Text';
import { toggleFeature } from '@/shared/lib/featureFlags';
import { UIDesignSwitcher } from '@/features/uiDesignSwitcher';

interface SettingsPageProps {
	className?: string;
}

const SettingsPage = memo((props: PropsWithChildren<SettingsPageProps>) => {
	const { className } = props;

	const { t } = useTranslation('settings');

	const Text = DesignV2Text;

	return (
		<PageWrapper>
			<VStack gap={12}>
				<Text title={t('title')} />
				<UIDesignSwitcher />
			</VStack>
		</PageWrapper>
	);
});

export default SettingsPage;
