import { useState } from "react";
import cs from "classnames";
import { Icon, IconDefinition } from "../Icon/Icon";

interface PasswordFieldProps {
  id: string;
  name: string;
  value: string | number;
  label?: string;
  icon?: IconDefinition;
  error?: string;
  placeholder?: string;
  onChange: (name: string, value: string | number) => void;
  className?: string;
}

export const PasswordField = (props: PasswordFieldProps) => {
  const { id, name, value, label, error, placeholder, onChange, className } = props;
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => {
    setToggle((prevState) => !prevState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    onChange(name, value);
  };

  return (
    <div className={className}>
      <div className="relative w-full">
        {label && (
          <label className={error && "text-sm font-medium"} htmlFor={label}>
            {label}
          </label>
        )}
        <div className="relative flex">
          {/* {icon && (
            <Icon
              icon={icon}
              className={"absolute top-1/2 transform -translate-y-1/2 left-[22px]  center-vertically text-black "}
            />
          )} */}

          <Icon
            onClick={handleToggle}
            icon={toggle ? "eyeOff" : "eye"}
            className="absolute top-1/2 transform -translate-y-1/2 right-[22px] cursor-pointer"
          />

          <input
            id={id}
            name={name}
            value={value}
            type={toggle ? "text" : "password"}
            onChange={handleChange}
            placeholder={placeholder}
            className={cs(
              "bg-white leading-4 w-full  px-5 py-2.5 border-lightGray border-2 placeholder-gray text-xs  text-black rounded-xl focus:outline-none focus:z-10 ",
              { "border-red-400": !!error },
            )}
          />
        </div>
      </div>
      {error && (
        <div className="h-2 m-0 ml-2 mt-0.5 text-xs font-sans text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};
