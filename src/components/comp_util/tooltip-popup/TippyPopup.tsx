import React from "react";
import LeftRightButton from "../button/LeftRightButton";
import { cn } from "../../../utils/fn_utils";
import { IconBaseProps } from "react-icons/lib";

interface TippyPopupObject {
  LeftIcon?: React.ElementType;
  name?: React.ReactNode | string | null;
  RightIcon?: React.ElementType;
  isRight?: Boolean;
  leftClassName?: string;
  rightClassName?: string;
  leftIconProps?: IconBaseProps;
  rightIconProps?: IconBaseProps;
  className?: string;
  nameClassName?: string;
  onClick?: () => void;
  isShow?: boolean | null;
}
const TippyPopup: React.FC<{ tippyList?: TippyPopupObject[] | [] }> = ({
  tippyList,
}) => {
  return (
    <div>
      {tippyList?.map((item, index: number) => {
        if (Object.keys(item).includes("isShow") && !item?.isShow) return null;
        return (
          <div key={index + Date.now()}>
            <LeftRightButton
              LeftIcon={item?.LeftIcon}
              name={item?.name}
              RightIcon={item?.RightIcon}
              isRight={item?.isRight || false}
              className={cn(
                "gap-x-3 px-5 py-4 hover:bg-[var(--gray-a)]",
                item?.className
              )}
              nameClassName={cn(
                "text-[var(--text-21)] font-normal",
                item?.nameClassName
              )}
              onClick={item?.onClick}
              leftClassName={item?.leftClassName}
              rightClassName={item?.rightClassName}
              leftIconProps={item?.leftIconProps}
              rightIconProps={item?.rightIconProps}
            />
            {tippyList?.length - 1 !== index && <hr />}
          </div>
        );
      })}
    </div>
  );
};

export default TippyPopup;
