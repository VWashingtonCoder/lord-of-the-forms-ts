import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { ClassTextInput } from "./ClassTextInput";
import { ClassPhoneInput } from "./ClassPhoneInput";
import { UserInformation } from "../types";
import {
  validateFormValue,
  isEmailValid,
  isCityValid,
  isPhoneValid,
  containsOnlyLetters,
} from "../utils/validations";

type FormProps = {
  updateUser: (newUser: UserInformation) => void;
};

type FormState = {
  formValues: UserInformation;
  formSubmitted: boolean;
};

const initFormValues: UserInformation = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  phone: "",
};

export class ClassForm extends Component<FormProps, FormState> {
  state: FormState = {
    formValues: initFormValues,
    formSubmitted: false,
  };

  changeFormValues = (key: string, value: string) => {
    if (key !== "email" && key !== "phone")
      if (!containsOnlyLetters(value) && value.length > 0) return;

    this.setState((prevState) => ({
      formValues: {
        ...prevState.formValues,
        [key]: value,
      },
    }));
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { formValues } = this.state;
    let validForm = true;

    Object.entries(formValues).every(([key, value]) => {
      validForm = validateFormValue(key, value);
      return validForm;
    });

    if (validForm) {
      this.props.updateUser(formValues);
      this.setState({
        formValues: initFormValues,
        formSubmitted: false,
      });
    } else {
      alert("Bad Inputs");
      this.setState({ formSubmitted: true });
    }
  };

  render() {
    const { formValues, formSubmitted } = this.state;
    const { firstName, lastName, email, city, phone } = formValues;
    const errors = {
      firstName:
        firstName.length < 2 && formSubmitted
          ? "First name must be at least 2 characters long"
          : "",
      lastName:
        lastName.length < 2 && formSubmitted
          ? "Last name must be at least 2 characters long"
          : "",
      email: !isEmailValid(email) && formSubmitted ? "Email is Invalid" : "",
      city: !isCityValid(city) && formSubmitted ? "State is Invalid" : "",
      phone:
        !isPhoneValid(phone) && formSubmitted ? "Invalid Phone Number" : "",
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
    ] as const;

    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {textInputs.map((input) => (
          <>
            <ClassTextInput
              key={input.key}
              label={input.label}
              labelFor={input.key}
              inputProps={{
                id: input.key,
                placeholder: input.placeholder,
                value: formValues[input.key],
                list: input.key === "city" ? "cities" : undefined,
                onChange: (e) => {
                  const { value } = e.target;
                  this.changeFormValues(input.key, value);
                },
              }}
            />
            <ErrorMessage
              message={errors[input.key]}
              show={errors[input.key] !== ""}
            />
          </>
        ))}

        <ClassPhoneInput setPhoneNumber={this.changeFormValues} />

        <ErrorMessage message={errors.phone} show={errors.phone !== ""} />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
