"use client";
import { ErrorMessage, getIn, useFormikContext } from "formik";
import {
  ComponentProps,
  FC,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useState,
} from "react";

import IonIcon from "@reacticons/ionicons";
import classNames from "classnames";

export interface InputProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  name: Extract<keyof T, string>;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  Icon?: FC<ComponentProps<"svg">>;
  as?: "input" | "textarea";
  label?: string;
  rows?: number;
  isPass?: boolean;
}

const Input = <T,>({
  className,
  name,
  Icon,
  as = "input",
  label,
  containerProps,
  isPass = false,
  type,
  rows = 5,
  placeholder,
  ...props
}: InputProps<T>) => {
  const { errors, touched, values, setFieldValue } = useFormikContext<T>();
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  // current value
  const currentValue = getIn(values, name);

  const handleTextTrimOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const trimmedValue = e.target.value.trim();
    setFieldValue(name, trimmedValue);
  };

  return name ? (
    <>
      <div
        className={classNames(
          "relative  w-full items-center",
          containerProps?.className,
        )}
      >
        {label && <label htmlFor={name}>{label}</label>}
        <div
          className={classNames(
            "bg-light-bg-3  flex items-center gap-4 overflow-hidden rounded-3xl border",
            "focus-within:border-primary disabled:cursor-not-allowed border-background-4 focus-within:shadow focus-within:shadow-primary-100",
            props?.disabled
              ? ""
              : touched[name]
                ? errors[name]
                  ? "border-error shadow shadow-error-100"
                  : "border-background-4 shadow-primary-100"
                : "border-background-4",
          )}
        >
          {Icon && <Icon className="h-6 w-6" />}
          {as === "input" ? (
            <>
              <input
                className={classNames(
                  "relative bg-light-bg-3 flex-1 p-3 disabled:cursor-not-allowed outline-none placeholder:text-text-2 w-full",
                  className,
                )}
                // as={as}
                name={name}
                value={currentValue}
                onChange={(e) => {
                  setFieldValue(name, e.target?.value);
                }}
                onBlur={handleTextTrimOnBlur}
                type={
                  type === "password"
                    ? isPassVisible
                      ? "text"
                      : "password"
                    : type
                }
                placeholder={placeholder}
                {...props}
              />
              {type === "password" && isPass && (
                <IonIcon
                  name={isPassVisible ? "eye" : "eye-off"}
                  className="absolute right-4 cursor-pointer"
                  onClick={() => setIsPassVisible(!isPassVisible)}
                />
              )}
            </>
          ) : (
            <>
              {as === "textarea" ? (
                <>
                  <textarea
                    className={classNames(
                      "relative bg-light-bg-3 flex-1 p-3  outline-none placeholder:text-text-2 w-full",
                      className,
                      "h-32",
                    )}
                    rows={rows}
                    name={name}
                    value={currentValue}
                    onChange={(e) => {
                      setFieldValue(name, e.target?.value);
                    }}
                    onBlur={handleTextTrimOnBlur}
                    placeholder={placeholder}
                  />
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
        <ErrorMessage
          name={name}
          render={(message) => {
            return (
              <div className="absolute mt-1 w-0 min-w-full text-xs text-errorColor">
                {message}
              </div>
            );
          }}
        />
      </div>
    </>
  ) : null;
};

export default Input;