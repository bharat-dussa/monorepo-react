import { createStore } from './createStore';

export interface CounterState {
  count: number;
  step: number;
}

const initialCounterState: CounterState = {
  count: 0,
  step: 1,
};

export const counterStore = createStore<CounterState>(initialCounterState);

export const counterActions = {
  increment: () => {
    const { count, step } = counterStore.getState();
    counterStore.setState({ count: count + step });
  },
  decrement: () => {
    const { count, step } = counterStore.getState();
    counterStore.setState({ count: Math.max(0, count - step) });
  },
  reset: () => {
    counterStore.setState({ count: 0 });
  },
  setStep: (step: number) => {
    counterStore.setState({ step });
  },
};
