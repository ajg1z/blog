import { buildSelector } from '@/shared/lib/store';

export const [useCounterValue] = buildSelector((state) => state.counter.value);
