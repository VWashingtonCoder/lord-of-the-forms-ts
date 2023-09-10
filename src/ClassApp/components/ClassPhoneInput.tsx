import { Component } from "react";

type PhoneInputProps = {
  id: string;
  idx: number;
  value: string;
  onChange: (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  refGroup: React.RefObject<HTMLInputElement>[] | null;
};

export class ClassPhoneInput extends Component<PhoneInputProps> {
  render() {
    const { id, idx, value, onChange, refGroup } = this.props;
    const ref = refGroup ? refGroup[idx] : null;

    return (
      <>
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(idx)(e)}
          ref={ref}
          type="text"
          placeholder={id === "phone-input-4" ? "5" : "55"}
          maxLength={id === "phone-input-4" ? 1 : 2}
        />
        {id !== "phone-input-4" && "-"}
      </>
    );
  }
}
