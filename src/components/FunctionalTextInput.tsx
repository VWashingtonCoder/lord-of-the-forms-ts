type TextInputProps = {
  name: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (key: string, value: string) => void;
};

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
