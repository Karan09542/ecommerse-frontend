import React, { useEffect } from "react";

interface outSideCloseProps {
  setState: (arg: string | null) => void;
  ref: React.RefObject<HTMLElement>;
  arg: string | null;
}
function outSideClose({ setState, ref, arg }: outSideCloseProps) {
  return useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement) || null;
      if (ref.current && !ref.current.contains(target)) {
        setState(arg);
      }
    }
    window.addEventListener("pointerdown", handleClick);
    return () => window.removeEventListener("pointerdown", handleClick);
  }, [setState, ref, arg]);
}

export default outSideClose;
