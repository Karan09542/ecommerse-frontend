import React from "react";
import { cn } from "../../../utils/fn_utils";
import { RiArrowDownSLine } from "react-icons/ri";
import { IconBaseProps } from "react-icons/lib";

interface ImageButtonProps {
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
  img?: string;
}
const ImageButton: React.FC<ImageButtonProps> = ({
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
  // isDottedText,
  // minWidth,
  img,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-y-2 items-center cursor-pointer",
        className
      )}
      //   style={{ minWidth: isDottedText ? minWidth || 0 : "" }}
      onClick={onClick}
    >
      {img && (
        <img
          src={img}
          alt=""
          className={cn("w-16 h-16 text-white", leftClassName)}
        />
      )}
      {LeftIcon && (
        <LeftIcon
          {...leftIconProps}
          className={cn("w-[18px] text-white", leftClassName)}
        />
      )}
      <div
        className={cn(
          "flex items-center justify-center cursor-pointer",
          nameClassName
        )}
      >
        <span className={cn("font-bold text-white", nameClassName)}>
          {name}
        </span>
        {RightIcon ? (
          <RightIcon {...rightIconProps} className={cn("", rightClassName)} />
        ) : (
          isRight && (
            <RiArrowDownSLine
              {...{ size: 20, color: "black", ...rightIconProps }}
              className={cn("text-white", rightClassName)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ImageButton;
