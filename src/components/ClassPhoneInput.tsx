import { Component } from "react";
import { PhoneInputProps } from "../types";

export class ClassPhoneInput extends Component<PhoneInputProps> {
  render() {
    const { id, idx, value, onChange, refGroup } = this.props;
    const ref = refGroup ? refGroup[idx] : null;
    const isNotLastInput = id !== "phone-input-4";

    return (
      <>
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(idx)(e)}
          ref={ref}
          type="text"
          placeholder={isNotLastInput ? "55" : "5"}
          maxLength={isNotLastInput ? 2 : 1}
        />
        {isNotLastInput && "-"}
      </>
    );
  }
}
