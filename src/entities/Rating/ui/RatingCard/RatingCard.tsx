import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useState } from 'react';
import { Card } from '@/shared/ui/deprecated/Card';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Text } from '@/shared/ui/deprecated/Text';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { HStack, VStack } from '@/shared/ui/designV2/Stack';
import { TextArea } from '@/shared/ui/deprecated/Input';
import { Button } from '@/shared/ui/deprecated/Button';
import { RotatingLinesLoader } from '@/shared/ui/deprecated/Loaders';

interface RatingCardProps {
	className?: string;
	hasFeedback: boolean;
	feedbackTitle?: string;
	title?: string;
	rate?: number;
	isSending?: boolean;
	initFeedback?: string;
	onCancel?: (startsCount: number) => void;
	onSendRating?: (startsCount: number, feedback?: string) => void;
}

export const RatingCard = memo((props: PropsWithChildren<RatingCardProps>) => {
	const {
		hasFeedback,
		className,
		title,
		feedbackTitle,
		rate = 0,
		isSending,
		initFeedback = '',
		onCancel,
		onSendRating,
	} = props;

	const { t } = useTranslation();

	const [isOpenModal, setIsOpenModal] = useState(false);
	const [starsCount, setStarsCount] = useState(rate);

	const [feedback, setFeedback] = useState(initFeedback);

	const onSelectStars = (starsCount: number) => {
		setStarsCount(starsCount);
		if (hasFeedback) {
			setIsOpenModal(true);
		} else {
			onCancel?.(starsCount);
		}
	};

	const onChangeFeedback = (value: string) => {
		if (value.length < 64) {
			setFeedback(value);
		}
	};

	const onSendFeedback = () => {
		setIsOpenModal(false);
		onSendRating?.(starsCount, feedback);
	};

	const onCancelFeedback = () => {
		setIsOpenModal(false);
		onCancel?.(starsCount);
	};

	const isShowFeedback = Boolean(starsCount && hasFeedback && feedback && !isOpenModal && !isSending);

	return (
		<Card data-testid='RatingCard' className={className}>
			<VStack gap={8} align='center'>
				{isSending ? (
					<VStack align='center' gap={8} justify='center'>
						<RotatingLinesLoader width='50px' />
						<Text text={t('sending')} />
					</VStack>
				) : (
					<>
						<Text align='center' title={title} />
						<StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
					</>
				)}

				{isShowFeedback && <Text text={feedback} />}

				<Modal title={feedbackTitle} isOpen={isOpenModal}>
					<VStack gap={12}>
						<TextArea
							theme='outline'
							rows={4}
							value={feedback}
							onChangeValue={onChangeFeedback}
							data-testid='RatingCard.TextArea'
						/>
						<HStack justify='end' gap={8}>
							<Button data-testid='RatingCard.Cancel' theme='outlineRed' onClick={onCancelFeedback}>
								{t('button.cancel')}
							</Button>
							<Button data-testid='RatingCard.Send' onClick={onSendFeedback}>
								{t('button.send')}
							</Button>
						</HStack>
					</VStack>
				</Modal>
			</VStack>
		</Card>
	);
});
