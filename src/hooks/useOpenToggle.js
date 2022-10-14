import { useCallback, useState } from 'react';

const useOpenToggle = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

export default useOpenToggle;