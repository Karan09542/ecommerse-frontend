import React from "react";
import { cn } from "../../../utils/fn_utils.ts";
import { RiArrowDownSLine } from "react-icons/ri";
import { IconBaseProps } from "react-icons/lib";

interface LeftRightButtonProps {
  LeftIcon?: React.ElementType | null;
  name?: React.ReactNode;
  nameClassName?: string;
  RightIcon?: React.ElementType | null;
  isRight?: Boolean;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
  leftIconProps?: IconBaseProps;
  rightIconProps?: IconBaseProps;
  onClick?: () => void;
  isDottedText?: boolean;
  minWidth?: string | number;
}
const LeftRightButton: React.FC<LeftRightButtonProps> = ({
  LeftIcon,
  name,
  RightIcon,
  isRight = true,
  className,
  leftClassName,
  rightClassName,
  nameClassName,
  leftIconProps,
  rightIconProps,
  onClick,
  isDottedText,
  minWidth,
}) => {
  return (
    <div
      className={cn("flex items-center gap-x-1 cursor-pointer", className)}
      style={{ minWidth: isDottedText ? minWidth || 0 : "" }}
      onClick={onClick}
    >
      {LeftIcon && (
        <LeftIcon
          {...leftIconProps}
          className={cn("w-[18px] text-white", leftClassName)}
        />
      )}
      <span className={cn("font-bold text-white", nameClassName)}>{name}</span>
      {RightIcon ? (
        <RightIcon {...rightIconProps} className={cn("", rightClassName)} />
      ) : (
        isRight && (
          <RiArrowDownSLine className={cn("w-3 text-white", rightClassName)} />
        )
      )}
      {/* <span className={cn("text-dot")}>{" राम".repeat(5)}</span> */}
    </div>
  );
};

export default LeftRightButton;
