import { Fragment, ReactNode, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Listbox as HListBox } from '@headlessui/react';
import { Placement } from '@floating-ui/react';
import { BsCheck } from 'react-icons/bs';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useCalculatePosition } from '@/shared/lib/hooks/useCalculatePosition/useCalculatePosition';
import cls from './ListBox.module.scss';
import { Button } from '@/shared/ui/designV2/Button';
import { HStack } from '@/shared/ui/designV2/Stack';
import { Icon } from '../Icon';

export interface ListBoxItem<T extends string> {
	value: T;
	content?: ReactNode;
	disabled?: boolean;
}

export interface ListBoxProps<T extends string> {
	className?: string;
	items?: ListBoxItem<T>[];
	value?: T;
	onChange?: (value: T) => void;
	defaultValue?: T;
	label?: string;
	readonly?: boolean;
	disabled?: boolean;
	placement?: Placement;
	labelClass?: string;
}

export const ListBox = <T extends string>(props: ListBoxProps<T>) => {
	const {
		items,
		onChange,
		value,
		className,
		defaultValue,
		placement = 'bottom',
		labelClass,
		label,
		readonly,
		disabled,
	} = props;

	const buttonRef = useRef<HTMLButtonElement | null>(null);

	const selectedContent = items?.find((item) => item.value === (value ?? defaultValue));

	const calculatePosition = useCalculatePosition(buttonRef, placement);

	return (
		<HStack gap={12}>
			{label && <span className={labelClass}>{label}</span>}
			<HListBox
				as='div'
				value={value}
				className={classNames(cls.ListBox, {}, [className])}
				onChange={onChange}
				disabled={disabled}
			>
				<HListBox.Button as={Fragment}>
					<Button
						ref={buttonRef}
						disabled={readonly || disabled}
						variant={readonly ? 'clear' : 'filled'}
						className={classNames(cls.triggerBtn, { [cls.readonly]: readonly })}
						addonRight={!readonly && !disabled ? <IoIosArrowDown /> : null}
					>
						{selectedContent?.content ?? selectedContent?.value}
					</Button>
				</HListBox.Button>

				<HListBox.Options ref={calculatePosition} className={cls.options}>
					{items
						?.filter((item) => Boolean(item.value))
						.map((option) => (
							<HListBox.Option
								key={option.value}
								value={option.value}
								as={Fragment}
								disabled={option.disabled}
							>
								{({ selected, active, disabled }) => (
									<li
										className={classNames(cls.item, {
											[cls.selectedItem]: selected,
											[cls.disabledItem]: disabled,
											[cls.activeItem]: active,
										})}
									>
										{option.content ?? option.value}
										{selected && <Icon Svg={BsCheck} />}
									</li>
								)}
							</HListBox.Option>
						))}
				</HListBox.Options>
			</HListBox>
		</HStack>
	);
};
