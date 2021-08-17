import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const batch = ReactDOM.unstable_batchedUpdates;

export default function useOutsideClick<T extends HTMLElement>(
  nodeRef: React.MutableRefObject<T | undefined>,
  onOutsideClick: () => void
) {
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const node = nodeRef.current;
      if (!node) {
        return;
      }
      const clickTarget = e.target as HTMLElement;
      if (node.contains(clickTarget)) {
        return;
      }
      batch(onOutsideClick);
    };
    document.body.addEventListener('click', handleDocumentClick, { capture: true });
    return () => document.body.removeEventListener('click', handleDocumentClick, { capture: true });
  }, [nodeRef, onOutsideClick]);
}
