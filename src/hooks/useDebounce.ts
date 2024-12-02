import { useCallback, useRef } from 'react';

// 단순화된 타입 정의
interface DebouncedFunction<TArgs extends unknown[]> {
  (...args: TArgs): void;
  cancel: () => void;
}

export const useDebounce = <TArgs extends unknown[]>(
  callback: (...args: TArgs) => unknown,
  delay: number
): DebouncedFunction<TArgs> => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedFunction = useCallback(
    (...args: TArgs) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        void callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as DebouncedFunction<TArgs>;

  debouncedFunction.cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return debouncedFunction;
};