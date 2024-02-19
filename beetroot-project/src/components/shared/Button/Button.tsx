import cs from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { Spinner } from "../Spinner/Spinner";

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const { className, children, loading, ...rest } = props;
  return (
    <button
      className={cs(
        "w-max text-sm w-a flex items-center justify-center py-2.5 px-4 font-medium rounded-med text-white bg-slate-500 hover:bg-darkPrimary  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 disabled:bg-gray-300 disabled:cursor-not-allowed",
        className,
      )}
      {...rest}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
