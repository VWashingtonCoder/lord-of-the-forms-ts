import { Component, createRef } from "react";
import { PhoneValues } from "../types";
import { containsOnlyNumbers } from "../utils/validations";

type PhoneInputProps = {
  setPhoneNumber: (key: string, value: string) => void;
};

type PhoneInputState = {
  phone: PhoneValues;
};

export class ClassPhoneInput extends Component<
  PhoneInputProps,
  PhoneInputState
> {
  state: PhoneInputState = {
    phone: ["", "", "", ""],
  };

  refGroup = [
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
    createRef<HTMLInputElement>(),
  ];

  changePhoneValues =
    (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const { setPhoneNumber } = this.props;
      const { phone } = this.state;
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[idx];
      const nextInput = this.refGroup[idx + 1];
      const previousInput = this.refGroup[idx - 1];

      if (
        (containsOnlyNumbers(value) && value.length <= currentMaxLength) ||
        value === ""
      ) {
        const newPhoneValues = phone.map((num, i) =>
          i === idx ? value : num
        ) as PhoneValues;

        if (value.length === currentMaxLength && nextInput) {
          nextInput.current?.focus();
        } else if (value.length === 0 && previousInput) {
          previousInput.current?.focus();
        }

        this.setState({ phone: newPhoneValues });
        setPhoneNumber("phone", newPhoneValues.join(""));
      }
    };

  render() {
    const { phone } = this.state;

    return (
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          {[0, 1, 2, 3].map((idx) => (
            <>
              <input
                key={`phone-input-${idx + 1}`}
                id={`phone-input-${idx + 1}`}
                type="text"
                placeholder={idx === 3 ? "5" : "55"}
                value={phone[idx]}
                onChange={this.changePhoneValues(idx)}
                ref={this.refGroup[idx]}
              />
              {idx !== 3 && "-"}
            </>
          ))}
        </div>
      </div>
    );
  }
}
