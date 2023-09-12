import { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { ClassTextInput } from "../components/ClassTextInput";
import { ClassPhoneInput } from "../components/ClassPhoneInput";
import { StringObject, TextValues, PhoneValues, FormProps } from "../types";
import { textInputs, phoneInputs, initFormValues } from "../utils/constants";
import {
  validateFormValue,
  containsOnlyNumbers,
  containsOnlyLetters,
} from "../utils/validations";

type FormState = {
  textValues: TextValues;
  phoneValues: PhoneValues;
  errors: StringObject;
};

export class ClassForm extends Component<FormProps, FormState> {
  state: FormState = {
    textValues: initFormValues.text,
    phoneValues: initFormValues.phone as PhoneValues,
    errors: {},
  };

  ref1 = createRef<HTMLInputElement>();
  ref2 = createRef<HTMLInputElement>();
  ref3 = createRef<HTMLInputElement>();
  ref4 = createRef<HTMLInputElement>();
  refGroup: React.RefObject<HTMLInputElement>[] = [
    this.ref1,
    this.ref2,
    this.ref3,
    this.ref4,
  ];

  changeTextValues = (key: string, value: string) => {
    const valid = validateFormValue(key, value) === "";

    if (key !== "email" && !containsOnlyLetters(value) && value.length > 0) {
      return;
    } else if (this.state.errors[key] !== undefined && valid) {
      const errors = { ...this.state.errors };
      delete errors[key];
      this.setState({ errors });
    }

    this.setState((prevState) => ({
      textValues: {
        ...prevState.textValues,
        [key]: value,
      },
    }));
  };

  changePhoneValues =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const nextInput = this.refGroup[index + 1];
      const previousInput = this.refGroup[index - 1];

      if (containsOnlyNumbers(value) && value.length <= currentMaxLength) {
        const newPhoneValues: PhoneValues = [...this.state.phoneValues];
        newPhoneValues[index] = value;

        if (value.length === currentMaxLength && nextInput) {
          nextInput.current?.focus();
        } else if (value.length === 0 && previousInput) {
          previousInput.current?.focus();
        }

        if (
          this.state.errors.phone !== undefined &&
          validateFormValue("phone", newPhoneValues.join("")) === ""
        ) {
          const errors = { ...this.state.errors };
          delete errors.phone;
          this.setState({ errors });
        }

        this.setState({ phoneValues: newPhoneValues });
      }
    };

    resetForm = () => {
      this.setState({
        textValues: {
          firstName: "",
          lastName: "",
          email: "",
          city: "",
        },
        phoneValues: ["", "", "", ""],
      });
    }

  submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { textValues, phoneValues } = this.state;
    const { updateUser } = this.props;
    const errors: StringObject = {};

    textInputs.forEach((input) => {
      const { key } = input;
      const value = textValues[key];
      const error = validateFormValue(key, value);
      if (error) errors[key] = error;
    });

    const phoneString = phoneValues.join("");
    const phoneError = validateFormValue("phone", phoneString);
    if (phoneError) errors.phone = phoneError;

    if (Object.keys(errors).length > 0) {
      alert("Bad Inputs");

      this.setState({ errors });
    } else {
      updateUser({
        ...textValues,
        phone: phoneString,
      });

      this.setState({
        textValues: {
          firstName: "",
          lastName: "",
          email: "",
          city: "",
        },
        phoneValues: ["", "", "", ""],
      });
    }
  };

  render() {
    const { textValues, phoneValues, errors } = this.state;

    return (
      <form onSubmit={this.submitForm}>
        <u>
          <h3>User Information Form</h3>
        </u>
        {textInputs.map((input) => (
          <>
            <ClassTextInput
              key={input.key}
              name={input.key}
              label={input.label}
              placeholder={input.placeholder}
              value={textValues[input.key]}
              onChange={this.changeTextValues}
            />
            <ErrorMessage
              message={errors[input.key]}
              show={errors[input.key] !== undefined}
            />
          </>
        ))}

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            {phoneInputs.map((inputId, idx) => (
              <ClassPhoneInput
                key={inputId}
                id={inputId}
                idx={idx}
                value={phoneValues[idx]}
                onChange={this.changePhoneValues}
                refGroup={this.refGroup}
              />
            ))}
          </div>
        </div>

        <ErrorMessage
          message={errors.phone}
          show={errors.phone !== undefined}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
