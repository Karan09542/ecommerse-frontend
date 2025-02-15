import React from "react";
import { cn } from "../../utils/fn_utils.ts";

interface TextProps {
  text: React.ReactNode;
  className?: string;
}
const Text: React.FC<TextProps> = ({ text, className }) => {
  return (
    <div className={cn("text-[#878787] text-[0.75rem]", className)}>{text}</div>
  );
};

export default Text;
