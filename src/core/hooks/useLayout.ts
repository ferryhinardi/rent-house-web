import { useState, useCallback, useEffect, useRef } from 'react';
import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import { LayoutChangeEvent } from 'react-native';

export type LayoutRectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
  hasFinishedLayout: boolean;
};

type Bindings = {
  onLayout: (layoutChange: LayoutChangeEvent) => void;
};

// RNW uses ResizeObserver / window.onresize API
// to detect layout changes. These are raw DOM events,
// meaning updates triggered inside these callbacks
// won't get batched by React.
//
// onLayout is hot during app mount. The longer it takes,
// the longer your app gets to cpu idle. One way to alleviate
// this is to batch `setLayout` calls into a single render pass
const callbackMap = new Map<string, Array<() => void>>();
let didCleanup = false;
let rafId: ReturnType<typeof requestAnimationFrame>;
function flushCallbacks() {
  if (didCleanup) {
    return;
  }
  batchUpdates(() => {
    callbackMap.forEach(callbacks => {
      while (callbacks.length !== 0) {
        const callback = callbacks.shift();
        callback!();
      }
    });
  });
}

let id = 0;

export default function useLayout(): [LayoutRectangle, Bindings] {
  const [layout, setLayout] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0, hasFinishedLayout: false });

  const renderId = useRef<string | null>(null);
  if (renderId.current === null) {
    renderId.current = String(++id);
    if (typeof window !== 'undefined') {
      callbackMap.set(renderId.current, []);
    }
  }

  useEffect(() => {
    const id = renderId.current!;
    return () => {
      callbackMap.delete(id);
    };
  }, []);

  const onLayout = useCallback((layoutChange: LayoutChangeEvent) => {
    const { x, y, width, height } = layoutChange.nativeEvent.layout;
    const callbacks = callbackMap.get(renderId.current!)!;
    callbacks.push(() => setLayout({ x, y, width, height, hasFinishedLayout: true }));
    // schedule flush in the next frame
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(flushCallbacks);
  }, []);

  return [layout, { onLayout }];
}
