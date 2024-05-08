import { useRef, useState, useCallback } from 'react';

// This hook returns a ref and a toggle function
export const useTogglePosition = (initialState = false, translateDistance = '-100%') => {
  const ref = useRef(null);
  const [isExpanded, setIsExpanded] = useState(initialState);

  const togglePosition = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = isExpanded ? `translateX(0%)` : `translateX(${translateDistance})`;
      setIsExpanded(!isExpanded);
    }
  }, [isExpanded, translateDistance]);

  return [ref, togglePosition, isExpanded];
};
