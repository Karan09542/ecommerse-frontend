import React from "react";
import { BeatLoader } from "react-spinners";
import { cn } from "../../../utils/fn_utils.ts";

interface LoadingProps {
  size?: number;
  color?: string;
  className?: string;
}
const Loading: React.FC<LoadingProps> = ({
  size = 11,
  color = "var(--site-color)",
  className,
}) => {
  return (
    <div className={cn("w-fit mx-auto", className)}>
      <BeatLoader size={size} color={color} />
    </div>
  );
};

export default Loading;
