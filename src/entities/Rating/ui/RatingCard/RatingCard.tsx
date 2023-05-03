import { useTranslation } from 'react-i18next';
import { PropsWithChildren, memo, useCallback, useState } from 'react';
import cls from './RatingCard.module.scss';
import { Card } from '@/shared/ui/Card';
import { StarRating } from '@/shared/ui/StarRating';
import { Text } from '@/shared/ui/Text';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input, TextArea } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

interface RatingCardProps {
    className?: string;
    hasFeedback: boolean;
    feedbackTitle?: string;
    title?: string;
    rate?: number;
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
        onCancel,
        onSendRating,
    } = props;
    const { t } = useTranslation();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = (starsCount: number) => {
        setStarsCount(starsCount);
        if (hasFeedback) {
            setIsOpenModal(true);
        } else {
            onCancel?.(starsCount);
        }
    };

    const onChangeFeedback = (value: string) => {
        setFeedback(value);
    };

    const onSendFeedback = () => {
        setIsOpenModal(false);
        onSendRating?.(starsCount, feedback);
    };

    const onCancelFeedback = () => {
        setIsOpenModal(false);
        onCancel?.(starsCount);
    };

    return (
        <Card className={className}>
            <VStack gap={8} align='center'>
                <Text align='center' title={title} />
                <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
                <Modal title={feedbackTitle} isOpen={isOpenModal}>
                    <VStack gap={12}>
                        <TextArea
                            theme='outline'
                            rows={4}
                            value={feedback}
                            onChangeValue={onChangeFeedback}
                        />
                        <HStack justify='end' gap={8}>
                            <Button theme='outlineRed' onClick={onCancelFeedback}>
                                {t('button.cancel')}
                            </Button>
                            <Button onClick={onSendFeedback}>{t('button.send')}</Button>
                        </HStack>
                    </VStack>
                </Modal>
            </VStack>
        </Card>
    );
});
