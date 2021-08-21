import { useRef } from 'react';

export default function useStable<T>(ctor: () => T): T {
  const ref = useRef<T>();
  if (!ref.current) {
    ref.current = ctor();
  }
  return ref.current;
}
