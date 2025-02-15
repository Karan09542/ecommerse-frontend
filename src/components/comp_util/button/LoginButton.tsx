import React from "react";
import { cn } from "../../../utils/fn_utils.ts";

interface LoginButtonProps {
  className?: string;
  name?: React.ReactNode;
  isDottedText?: boolean;
  minWidth?: string | number;
  onClick?: () => void;
}
const LoginButton: React.FC<LoginButtonProps> = ({
  className,
  // isDottedText,
  // minWidth,
  name = "Login",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      role="button"
      className={cn(
        "bg-white max-w-24 text-dot w-full px-3 text-center py-[0.225rem] rounded-[1px] text-[var(--site-color)] font-semibold text-[16px] cursor-pointer",
        className
      )}
    >
      {name}
    </div>
  );
};

export default LoginButton;
