import { PropsWithChildren, memo, useState } from 'react';
import cls from './StarRating.module.scss';
import StarIcon from '@/shared/assets/img/star.svg';
import { IconButton } from '../Icon/IconButton';
import { classNames } from '@/shared/lib/classNames/classNames';

interface StarRatingProps {
    className?: string;
    onSelect: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const starts = [1, 2, 3, 4, 5];

export const StarRating = memo((props: PropsWithChildren<StarRatingProps>) => {
    const { className, onSelect, selectedStars, size } = props;

    const [currentStartsCount, setCurrentStartsCount] = useState(0);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (startsCount: number) => () => {
        if (!isSelected) {
            setCurrentStartsCount(startsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStartsCount(0);
        }
    };

    const onClick = (startsCount: number) => () => {
        if (!isSelected) {
            setIsSelected(true);
            setCurrentStartsCount(startsCount);
            onSelect(startsCount);
        }
    };

    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {starts.map((starIndex) => (
                <IconButton
                    width={size}
                    height={size}
                    className={classNames(cls.startIconBtn, {
                        [cls.hovered]: currentStartsCount >= starIndex,
                        [cls.selected]: isSelected,
                    })}
                    key={starIndex}
                    Svg={StarIcon}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starIndex)}
                    onClick={onClick(starIndex)}
                />
            ))}
        </div>
    );
});
