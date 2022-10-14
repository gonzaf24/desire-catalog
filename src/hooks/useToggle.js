import { useState } from 'react';

const useToggle = (value1 = false, value2 = true) => {
  const [value, setValue] = useState(value1);

  const setFirst = () => setValue(value1);
  const setSecond = () => setValue(value2);
  const toggle = () => setValue(value === value1 ? value2 : value1);

  return {
    value,
    setFirst,
    setSecond,
    toggle,
  };
};

export default useToggle;
