import { useEffect, useState } from "react";
export const useDebounce = (value: string, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  useEffect(() => {
    console.log("debounce value", value)
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 800);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
};
