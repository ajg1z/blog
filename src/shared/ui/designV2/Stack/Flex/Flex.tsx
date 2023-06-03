import { FC, HTMLAttributes } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

type AlignItems = 'center' | 'start' | 'end' | 'baseline' | 'stretch';
type JustifyContent =
    | 'center'
    | 'start'
    | 'end'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
type Direction = 'column' | 'row';
type Gap = 4 | 8 | 12 | 24 | 36;

const gapClasses: Record<Gap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    12: cls.gap12,
    24: cls.gap24,
    36: cls.gap36,
};

const alignClasses: Record<AlignItems, string> = {
    baseline: cls.alignBaseline,
    center: cls.alignCenter,
    end: cls.alignEnd,
    start: cls.alignStart,
    stretch: cls.alignStretch,
};

const justifyClasses: Record<JustifyContent, string> = {
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    start: cls.justifyStart,
    'space-around': cls.justifySpaceAround,
    'space-between': cls.justifySpaceBetween,
    'space-evenly': cls.justifySpaceEvenly,
};

const directionClasses: Record<Direction, string> = {
    column: cls.directionColumn,
    row: cls.directionRow,
};

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    justify?: JustifyContent;
    align?: AlignItems;
    gap?: Gap;
    direction?: Direction;
    max?: boolean;
}

export const Flex: FC<FlexProps> = (props) => {
    const {
        className,
        children,
        align = 'center',
        direction = 'row',
        justify = 'start',
        gap,
        max,
        ...otherProps
    } = props;

    const classes = [
        className,
        alignClasses[align],
        directionClasses[direction],
        justifyClasses[justify],
        gap && gapClasses[gap],
    ];

    return (
        <div className={classNames(cls.Flex, { [cls.max]: max }, classes)} {...otherProps}>
            {children}
        </div>
    );
};
