import { useState } from "react";
import { FunctionalPhoneInput } from "../components/FunctionalPhoneInput";
import { ErrorMessage } from "../ErrorMessage";
import { UserInformation } from "../types";
import {
  containsOnlyLetters,
  isEmailValid,
  isCityValid,
  isPhoneValid,
} from "../utils/validations";
import { FunctionalTextInput } from "../components/FunctionalTextInput";

type FormProps = {
  updateUser: (newUser: UserInformation) => void;
};

const initFormValues: UserInformation = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  phone: "",
};

export const FunctionalForm = ({ updateUser }: FormProps) => {
  const [formValues, setFormValues] = useState(initFormValues);
  const { firstName, lastName, email, city, phone } = formValues;
  const [formSubmitted, setFormSubmitted] = useState(false);
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
    phone: !isPhoneValid(phone) && formSubmitted ? "Invalid Phone Number" : "",
  };

  const changeFormValues = (key: string, value: string) => {
    if (key !== "email" && key !== "phone")
      if (!containsOnlyLetters(value) && value.length > 0) return;

    setFormValues({ ...formValues, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validForm = true;

    Object.entries(formValues).forEach(([key, value]) => {
      if (value.length === 0) {
        validForm = false;
      } else if (
        (key === "firstName" || key === "lastName") &&
        value.length < 2
      ) {
        validForm = false;
      } else if (key === "email" && !isEmailValid(value)) {
        validForm = false;
      } else if (key === "city" && !isCityValid(value)) {
        validForm = false;
      } else if (key === "phone" && !isPhoneValid(value)) {
        validForm = false;
      }
    });

    if (validForm) {
      updateUser(formValues);
      setFormValues(initFormValues);
      setFormSubmitted(false);
    } else {
      alert("Bad Inputs");
      setFormSubmitted(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalTextInput
        label={"First Name"}
        labelFor={"firstName"}
        inputProps={{
          id: "firstName",
          placeholder: "Bilbo",
          value: firstName,
          onChange: (e) => {
            changeFormValues("firstName", e.target.value);
          },
        }}
      />
      <ErrorMessage message={errors.firstName} show={errors.firstName !== ""} />

      {/* last name input */}
      <FunctionalTextInput
        label={"Last Name"}
        labelFor={"lastName"}
        inputProps={{
          id: "lastName",
          placeholder: "Baggins",
          value: lastName,
          onChange: (e) => {
            changeFormValues("lastName", e.target.value);
          },
        }}
      />
      <ErrorMessage message={errors.lastName} show={errors.lastName !== ""} />

      {/* Email Input */}
      <FunctionalTextInput
        label={"Email"}
        labelFor={"email"}
        inputProps={{
          id: "email",
          placeholder: "bilbo-baggins@adventurehobbits.net",
          value: email,
          onChange: (e) => {
            changeFormValues("email", e.target.value);
          },
        }}
      />
      <ErrorMessage message={errors.email} show={errors.email !== ""} />

      {/* City Input */}
      <FunctionalTextInput
        label={"City"}
        labelFor={"city"}
        inputProps={{
          id: "city",
          placeholder: "Hobbiton",
          value: city,
          list: "cities",
          onChange: (e) => {
            changeFormValues("city", e.target.value);
          },
        }}
      />
      <ErrorMessage message={errors.city} show={errors.city !== ""} />

      {/* Phone Input */}
      <FunctionalPhoneInput setPhoneNumber={changeFormValues} />
      <ErrorMessage message={errors.phone} show={errors.phone !== ""} />

      <input type="submit" value="Submit" />
    </form>
  );
};
