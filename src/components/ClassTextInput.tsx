import { Component } from "react";
import { TextInputProps } from "../types";

export class ClassTextInput extends Component<TextInputProps> {
  render() {
    const { name, label, placeholder, value, onChange } = this.props;
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
  }
}
