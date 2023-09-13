import { useState, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { FunctionalTextInput } from "../components/FunctionalTextInput";
import { FunctionalPhoneInput } from "../components/FunctionalPhoneInput";
import { StringObject, TextValues, PhoneValues, FormProps } from "../types";
import { textInputs, phoneInputs, initFormValues } from "../utils/constants";
import {
  validateFormValue,
  containsOnlyNumbers,
  containsOnlyLetters,
} from "../utils/validations";

export const FunctionalForm = ({ updateUser }: FormProps) => {
  const [textValues, setTextValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
  } as TextValues);
  const [phoneValues, setPhoneValues] = useState([
    "",
    "",
    "",
    "",
  ] as PhoneValues);
  const [errors, setErrors] = useState({} as StringObject);

  const ref1 = createRef<HTMLInputElement>();
  const ref2 = createRef<HTMLInputElement>();
  const ref3 = createRef<HTMLInputElement>();
  const ref4 = createRef<HTMLInputElement>();
  const refGroup = [ref1, ref2, ref3, ref4];

  const changeTextValues = (key: string, value: string) => {
    const valid = validateFormValue(key, value) === "";

    if (key !== "email" && !containsOnlyLetters(value) && value.length > 0) {
      return;
    } else if (errors[key] !== undefined && valid) {
      const newErrors = { ...errors };
      delete newErrors[key];
      setErrors(newErrors);
    }

    setTextValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

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
        const newPhoneValues: PhoneValues = [...phoneValues];
        newPhoneValues[index] = value;

        if (value.length === currentMaxLength && nextInput) {
          nextInput.current?.focus();
        } else if (value.length === 0 && previousInput) {
          previousInput.current?.focus();
        }

        if (
          errors.phone !== undefined &&
          validateFormValue("phone", newPhoneValues.join("")) === ""
        ) {
          const newErrors = { ...errors };
          delete newErrors.phone;
          setErrors(newErrors);
        }

        setPhoneValues(newPhoneValues);
      }
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: StringObject = {};

    textInputs.forEach((input) => {
      const { key } = input;
      const value = textValues[key];
      const error = validateFormValue(key, value);
      if (error !== "") {
        newErrors[key] = error;
      }
    });

    const phoneValue = phoneValues.join("");
    const phoneError = validateFormValue("phone", phoneValue);
    if (phoneError !== "") {
      newErrors.phone = phoneError;
    }

    if (Object.keys(newErrors).length > 0) {
      alert("Please fix the errors in the form");
      setErrors(newErrors);
    } else {
      updateUser({
        ...textValues,
        phone: phoneValue,
      });
      setTextValues(initFormValues.text);
      setPhoneValues(initFormValues.phone as PhoneValues);
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {textInputs.map((input) => {
        const { key, label, placeholder } = input;
        const value = textValues[key];
        const error = errors[key];
        return (
          <>
            <FunctionalTextInput
              key={key}
              name={key}
              label={label}
              placeholder={placeholder}
              value={value}
              onChange={changeTextValues}
            />
            <ErrorMessage message={error} show={error !== undefined} />
          </>
        );
      })}

      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          {phoneInputs.map((inputId, index) => (
            <FunctionalPhoneInput
              key={index}
              id={inputId}
              idx={index}
              value={phoneValues[index]}
              refGroup={refGroup}
              onChange={changePhoneValues}
            />
          ))}
        </div>
      </div>

      <ErrorMessage message={errors.phone} show={errors.phone !== undefined} />

      <input type="submit" value="Submit" />
    </form>
  );
};
