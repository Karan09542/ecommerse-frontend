import React from "react";
import { CgSpinner } from "react-icons/cg";
import { cn } from "../../../utils/fn_utils";

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  name?: string | React.ReactNode;
  loading?: boolean;
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}
const Button: React.FC<ButtonProps> = ({
  onClick,
  name,
  loading,
  className,
  type,
}) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={cn(
          "bg-[var(--site-color)] text-white px-4 py-2 rounded mt-5 mx-2 cursor-pointer active:bg-[var(--site-color)]/80 flex items-center justify-center gap-2",
          className
        )}
      >
        {name} {loading && <CgSpinner className="animate-spin" />}
      </button>
    </>
  );
};

export default Button;
