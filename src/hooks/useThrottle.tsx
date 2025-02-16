import React from "react";

const useThrottle = (fn: any, delay = 1000) => {
  const isThrottle = React.useRef(true);
  return (...arg: any) => {
    if (isThrottle.current) {
      fn(...arg);
      isThrottle.current = false;
      setTimeout(() => (isThrottle.current = true), delay);
    }
  };
};

export default useThrottle;
