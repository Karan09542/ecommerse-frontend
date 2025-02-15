import React from "react";
import Text from "../Text";
import { cn } from "../../../utils/fn_utils";

interface ErrorMessageProps {
  message: React.ReactNode | string;
  className?: string;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  return (
    <Text
      className={cn("text-[var(--text-error)] font-medium", className)}
      text={message}
    />
  );
};

export default ErrorMessage;
