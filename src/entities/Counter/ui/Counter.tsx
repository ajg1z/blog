import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
	const { t } = useTranslation();

	const count = useCounterValue();
	const { decrement, increment } = useCounterActions();

	function onDecrement() {
		decrement();
	}

	function onIncrement() {
		increment();
	}

	return (
		<div>
			<h1 data-testid='count'>{count}</h1>
			<Button data-testid='decrement' onClick={onDecrement}>
				{t('decrement')}
			</Button>
			<Button data-testid='increment' onClick={onIncrement}>
				{t('increment')}
			</Button>
		</div>
	);
};
