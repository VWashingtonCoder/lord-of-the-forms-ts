import React, { useState, createRef } from "react";
import { containsOnlyNumbers } from "../utils/validations";

type PhoneInputProps = {
  setPhoneNumber: (key: string, value: string) => void;
};

const refGroup = [
  createRef<HTMLInputElement>(),
  createRef<HTMLInputElement>(),
  createRef<HTMLInputElement>(),
  createRef<HTMLInputElement>(),
];
const [ref1, ref2, ref3, ref4] = refGroup;

export const FunctionalPhoneInput = ({ setPhoneNumber }: PhoneInputProps) => {
  const [phone, setPhone] = useState(["", "", "", ""]);

  const changePhoneValues =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const nextInput = refGroup[index + 1];
      const previousInput = refGroup[index - 1];

      if (
        (containsOnlyNumbers(value) && value.length <= currentMaxLength) ||
        value === ""
      ) {
        const newPhoneValues = phone.map((num, i) =>
          i === index ? value : num
        );

        if (value.length === currentMaxLength && nextInput) {
          nextInput.current?.focus();
        } else if (value.length === 0 && previousInput) {
          previousInput.current?.focus();
        }

        setPhone(newPhoneValues);
        setPhoneNumber("phone", newPhoneValues.join(""));
      }
    };

  return (
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">
        <input
          type="text"
          id="phone-input-1"
          placeholder="55"
          value={phone[0]}
          onChange={changePhoneValues(0)}
          ref={ref1}
        />
        -
        <input
          type="text"
          id="phone-input-2"
          placeholder="55"
          value={phone[1]}
          onChange={changePhoneValues(1)}
          ref={ref2}
        />
        -
        <input
          type="text"
          id="phone-input-3"
          placeholder="55"
          value={phone[2]}
          onChange={changePhoneValues(2)}
          ref={ref3}
        />
        -
        <input
          type="text"
          id="phone-input-4"
          placeholder="5"
          value={phone[3]}
          onChange={changePhoneValues(3)}
          ref={ref4}
        />
      </div>
    </div>
  );
};
