import type { PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Field.module.scss';

interface FieldProps {
	label: string;
	className?: string;
	labelClass?: string;
}

export function Field(props: PropsWithChildren<FieldProps>) {
	const { className, labelClass, label, children } = props;

	return (
		// eslint-disable-next-line jsx-a11y/label-has-associated-control
		<label className={classNames(cls.Field, {}, [className])}>
			<span className={labelClass}>{label}</span>
			{children}
		</label>
	);
}
