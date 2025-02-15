import React from "react";
import { RxCross2 } from "react-icons/rx";
import { cn } from "../../../utils/fn_utils";
import { IconBaseProps } from "react-icons/lib";

interface CrossButtonProps {
  onClick?: () => void;
  className?: string;
  crossProps?: IconBaseProps;
}
const CrossButton: React.FC<CrossButtonProps> = ({
  onClick,
  className,
  crossProps,
}) => {
  return (
    <div
      className={cn(
        "cursor-pointer w-fit hover:bg-blue-100 text-red-500 hover:text-[var(--site-color)] p-2 rounded-full",
        className
      )}
      onClick={onClick}
    >
      <RxCross2 {...crossProps} size={20} />
    </div>
  );
};

export default CrossButton;
