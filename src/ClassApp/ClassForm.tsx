import { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { ClassTextInput } from "./components/ClassTextInput";
import { ClassPhoneInput } from "./components/ClassPhoneInput";
import { UserInformation, StringObject } from "../types";
import { containsNumbers, containsLetters } from "../utils/validations";

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
  errors: StringObject | null;
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
    errors: null,
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
    if (key !== "email" && containsNumbers(value)) {
      return;
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
      console.log("value", value);
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
      if (containsLetters(value)) return;

      if (shouldFocusNextInput) {
        nextInput.current.focus();
      } else if (shouldFocusPreviousInput) {
        previousInput.current.focus();
      }

      this.setState({ phoneValues: newPhoneValues });
    };

  render() {
    const { textValues, phoneValues, errors } = this.state;

    return (
      <form>
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
            <ErrorMessage message={errorMessages[input.key]} show={true} />
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

        <ErrorMessage message={errorMessages.phone} show={true} />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
