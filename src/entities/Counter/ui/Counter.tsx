import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';

export const Counter = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const count = useSelector(getCounterValue);

    function decrement() {
        dispatch(counterActions.decrement());
    }

    function increment() {
        dispatch(counterActions.increment());
    }

    return (
        <div>
            <h1 data-testid='count'>{count}</h1>
            <Button data-testid='decrement' onClick={decrement}>
                {t('decrement')}
            </Button>
            <Button data-testid='increment' onClick={increment}>
                {t('increment')}
            </Button>
        </div>
    );
};
