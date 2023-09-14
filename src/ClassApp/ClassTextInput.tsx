import { Component, ComponentProps } from "react";

type TextInputProps = {
  label: string;
  labelFor: string;
  inputProps: ComponentProps<"input">;
};

export class ClassTextInput extends Component<TextInputProps> {
  render() {
    const { label, labelFor, inputProps } = this.props;
    return (
      <div className="input-wrap">
        <label htmlFor={labelFor}>{label}:</label>
        <input {...inputProps} />
      </div>
    );
  }
}
