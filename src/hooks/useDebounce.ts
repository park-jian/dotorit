// useDebounce.ts
import { useCallback, useRef } from 'react';

type Timer = ReturnType<typeof setTimeout>;

// unknown을 사용하여 any를 피하면서도 범용성 유지
export function useDebounce<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
  delay: number
): (...args: Args) => void {
  const timeoutRef = useRef<Timer | null>(null);

  return useCallback((...args: Args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}