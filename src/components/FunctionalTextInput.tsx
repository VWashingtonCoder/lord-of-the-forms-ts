import { TextInputProps } from "../types";

export const FunctionalTextInput = ({
  name,
  label,
  placeholder,
  value,
  onChange,
}: TextInputProps) => {
  return (
    <div className="input-wrap">
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  );
};
