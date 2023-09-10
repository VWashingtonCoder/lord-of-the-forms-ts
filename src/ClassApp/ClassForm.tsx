import { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { ClassTextInput } from "./components/ClassTextInput";
import { ClassPhoneInput } from "./components/ClassPhoneInput";
import { UserInformation, StringObject } from "../types";
import {
  validateFormValue,
  containsOnlyNumbers,
  containsOnlyLetters,
} from "../utils/validations";

type FormProps = {
  updateUser: (newUser: UserInformation) => void;
};

type PhoneValues = [string, string, string, string];

type FormState = {
  textValues: {
    [firstName: string]: string;
    lastName: string;
    email: string;
    city: string;
  };
  phoneValues: PhoneValues;
  errors: StringObject;
};

const textInputs = [
  { key: "firstName", label: "First Name", placeholder: "Bilbo" },
  { key: "lastName", label: "Last Name", placeholder: "Baggins" },
  {
    key: "email",
    label: "Email",
    placeholder: "bilbo-baggins@adventurehobbits.net",
  },
  { key: "city", label: "City", placeholder: "Hobbiton" },
];

const phoneInputs = [
  "phone-input-1",
  "phone-input-2",
  "phone-input-3",
  "phone-input-4",
];

const errorMessages: StringObject = {
  firstName: "First name must be at least 2 characters long",
  lastName: "Last name must be at least 2 characters long",
  email: "Email is Invalid",
  city: "State is Invalid",
  phone: "Invalid Phone Number",
};

export class ClassForm extends Component<FormProps, FormState> {
  state: FormState = {
    textValues: {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
    },
    phoneValues: ["", "", "", ""],
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
      const shouldFocusNextInput =
        value.length === currentMaxLength && nextInput?.current;
      const shouldFocusPreviousInput =
        value.length === 0 && previousInput?.current;
      const newPhoneValues: PhoneValues = [...this.state.phoneValues];
      newPhoneValues[index] = value;
      const valid = validateFormValue("phone", newPhoneValues.join("-")) === "";

      if (!containsOnlyNumbers(value) && value.length > 0) {
        return;
      } else if (shouldFocusNextInput) {
        nextInput.current.focus();
      } else if (shouldFocusPreviousInput) {
        previousInput.current.focus();
      } else if (this.state.errors.phone !== undefined && valid) {
        const errors = { ...this.state.errors };
        delete errors.phone;
        this.setState({ errors });
      }

      this.setState({ phoneValues: newPhoneValues });
    };

  // submitForm Function
  submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting form");
    const { textValues, phoneValues } = this.state;
    const { updateUser } = this.props;
    const errors: StringObject = {};

    // Check if all text inputs are filled out
    textInputs.forEach((input) => {
      const { key } = input;
      const value = textValues[key];
      const error = validateFormValue(key, value);
      if (error) errors[key] = error;
    });

    // Check if all phone inputs are filled out
    const phoneError = validateFormValue("phone", phoneValues.join("-"));
    if (phoneError) errors.phone = phoneError;

    // If there are no errors, update user
    if (Object.keys(errors).length === 0) {
      updateUser({
        firstName: textValues.firstName,
        lastName: textValues.lastName,
        email: textValues.email,
        city: textValues.city,
        phone: phoneValues.join(""),
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
    } else alert("Bad Inputs");

    this.setState({ errors });
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
