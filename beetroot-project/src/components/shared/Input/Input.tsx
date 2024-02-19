import cs from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { IconDefinition } from "../Icon/Icon.generated";

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  touched?: boolean;
  inputClassName?: string;
  icon?: IconDefinition;
  errorClassName?: string;
  hiddenLabel?: boolean;
  labelClassName?: string;
}

const Input = (props: InputProps) => {
  const {
    className,
    label,
    error,
    id,
    inputClassName,
    errorClassName,
    labelClassName,
    hiddenLabel = true,
    ...rest
  } = props;

  return (
    <div className={cs("relative w-full", className)}>
      <div className="relative flex">
        <label htmlFor={id} className={hiddenLabel ? "sr-only" : `text-sm font-medium ${labelClassName}`}>
          {label}
        </label>
        {/* {icon && (
          <Icon
            icon={icon}
            className={"absolute top-1/2 transform -translate-y-1/2 left-[22px] center-vertically text-black "}
          />
        )} */}
        <input
          id={id}
          className={cs(
            "bg-white leading-4  w-full  px-5 py-2.5 border-lightGray border-2 placeholder-gray text-xs  text-black rounded-xl focus:outline-none focus:z-10 ",
            inputClassName,
            { "border-red-400": !!error },
          )}
          {...rest}
        />
      </div>
      {error && <pre className={cs("h-2 m-0 ml-2 mt-0.5 text-xs font-sans text-red-500", errorClassName)}>{error}</pre>}
    </div>
  );
};

export default Input;
