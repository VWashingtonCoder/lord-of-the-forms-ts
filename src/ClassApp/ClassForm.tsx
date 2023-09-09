import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { ClassTextInput } from "./components/ClassTextInput";
import { UserInformation, StringObject } from "../types";
import { containsNumbers } from "../utils/validations";

type FormProps = {
  updateUser: (newUser: UserInformation) => void;
};

type FormState = {
  values: UserInformation;
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

const errorMessages: StringObject = {
  firstName: "First name must be at least 2 characters long",
  lastName: "Last name must be at least 2 characters long",
  email: "Email is Invalid",
  city: "State is Invalid",
  phone: "Invalid Phone Number",
};

export class ClassForm extends Component<FormProps, FormState> {
  state: FormState = {
    values: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
    },
    errors: null,
  };

  changeValues = (key: string, value: string) => {
    if (key !== "email" && key !== "phone" && containsNumbers(value)) {
      return;
    }

    this.setState((prevState) => ({
      values: { ...prevState.values, [key]: value },
    }));
  };

  render() {
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
              value={this.state.values[input.key]}
              onChange={this.changeValues}
            />
            <ErrorMessage message={errorMessages[input.key]} show={true} />
          </>
        ))}

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input type="text" id="phone-input-1" placeholder="55" />
            -
            <input type="text" id="phone-input-2" placeholder="55" />
            -
            <input type="text" id="phone-input-3" placeholder="55" />
            -
            <input type="text" id="phone-input-4" placeholder="5" />
          </div>
        </div>

        <ErrorMessage message={errorMessages.phone} show={true} />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
