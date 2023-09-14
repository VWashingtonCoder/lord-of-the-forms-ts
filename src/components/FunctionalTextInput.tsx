import { ComponentProps } from "react";

type TextInputProps = {
  label: string;
  labelFor: string;
  inputProps: ComponentProps<"input">;
};

export const FunctionalTextInput = ({
  label,
  labelFor,
  inputProps,
}: TextInputProps) => {
  return (
    <div className="input-wrap">
      <label htmlFor={labelFor}>{label}:</label>
      <input {...inputProps} />
    </div>
  );
};
