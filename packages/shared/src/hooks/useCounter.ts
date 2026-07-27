import { counterStore, counterActions } from '../store/counterStore';

export function useCounter() {
  const count = counterStore.useStore((state) => state.count);
  const step = counterStore.useStore((state) => state.step);

  return {
    count,
    step,
    increment: counterActions.increment,
    decrement: counterActions.decrement,
    reset: counterActions.reset,
    setStep: counterActions.setStep,
  };
}
