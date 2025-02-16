import React, { useId } from "react";
import { cn } from "../../../utils/fn_utils.ts";
// import { UseFormRegister, FieldValues } from "react-hook-form";

interface InputFieldProps {
  label?: React.ReactNode;
  type?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  labelColor?: string;
  borderColor?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  inputStyle?: React.CSSProperties;
  register?: any;
}
const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  name,
  onChange,
  value,
  className,
  labelColor,
  borderColor,
  before,
  after,
  inputStyle,
  register,
}) => {
  const randId = useId();
  return (
    <div
      style={
        {
          "--label-color": labelColor || "var(--text-gray)",
          "--border-color": borderColor || "var(--site-color)",
        } as React.CSSProperties
      }
      className={cn("relative z-0", className)}
    >
      {before}
      <input
        type={type}
        id={randId}
        name={name}
        onChange={onChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[var(--border-color)] peer"
        placeholder=" "
        value={value}
        style={inputStyle}
        {...register}
      />
      {after}
      <label
        htmlFor={randId}
        className={`absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[var(--label-color)] peer-focus:dark:text-[var(--label-color)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;
