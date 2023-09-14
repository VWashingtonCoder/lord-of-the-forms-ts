import { useState } from "react";
import { FunctionalPhoneInput } from "../components/FunctionalPhoneInput";
import { ErrorMessage } from "../ErrorMessage";
import { UserInformation, TextValues, PhoneValues } from "../types";
import {
  containsOnlyNumbers,
  containsOnlyLetters,
  isEmailValid,
  isCityValid,
  isPhoneValid,
} from "../utils/validations";
import { FunctionalTextInput } from "../components/FunctionalTextInput";

type FormProps = {
  updateUser: (newUser: UserInformation) => void;
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: PhoneValues;
};

const initFormValues: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  city: "",
  phone: ["", "", "", ""],
};

export const FunctionalForm = ({ updateUser }: FormProps) => {
  const [formValues, setFormValues] = useState(initFormValues);
  const { firstName, lastName, email, city, phone } = formValues;
  const formSubmitted = false;
  const firstNameErrorMessage =
    firstName.length < 2 && formSubmitted
      ? "First name must be at least 2 characters long"
      : "";
  const lastNameErrorMessage =
    lastName.length < 2 && formSubmitted
      ? "Last name must be at least 2 characters long"
      : "";
  const emailErrorMessage =
    isEmailValid(email) && formSubmitted ? "Email is Invalid" : "";
  const cityErrorMessage =
    isCityValid(city) && formSubmitted ? "State is Invalid" : "";
  const phoneErrorMessage =
    isPhoneValid(phone.join("")) && formSubmitted ? "Invalid Phone Number" : "";

  // const ref1 = createRef<HTMLInputElement>();
  // const ref2 = createRef<HTMLInputElement>();
  // const ref3 = createRef<HTMLInputElement>();
  // const ref4 = createRef<HTMLInputElement>();
  // const refGroup = [ref1, ref2, ref3, ref4];

  const changeFormValues = (key: string, value: string) => {
    if (key !== "email" && key !== "phone")
      if (!containsOnlyLetters(value) && value.length > 0) return;

    setFormValues({ ...formValues, [key]: value });
  };

  // const changePhoneValues =
  //   (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { value } = e.target;
  //     const lengths = [2, 2, 2, 1];
  //     const currentMaxLength = lengths[index];
  //     const nextInput = refGroup[index + 1];
  //     const previousInput = refGroup[index - 1];

  //     if (
  //       (containsOnlyNumbers(value) && value.length <= currentMaxLength) ||
  //       value === ""
  //     ) {
  //       const newPhoneValues: PhoneValues = [...phoneValues];
  //       newPhoneValues[index] = value;

  //       if (value.length === currentMaxLength && nextInput) {
  //         nextInput.current?.focus();
  //       } else if (value.length === 0 && previousInput) {
  //         previousInput.current?.focus();
  //       }

  //       if (
  //         errors.phone !== undefined &&
  //         validateFormValue("phone", newPhoneValues.join("")) === ""
  //       ) {
  //         const newErrors = { ...errors };
  //         delete newErrors.phone;
  //         setErrors(newErrors);
  //       }

  //       setPhoneValues(newPhoneValues);
  //     }
  //   };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const newErrors: Record<string, string> = {};

  //   textInputs.forEach((input) => {
  //     const { key } = input;
  //     const value = textValues[key];
  //     const error = validateFormValue(key, value);
  //     if (error !== "") {
  //       newErrors[key] = error;
  //     }
  //   });

  //   const phoneValue = phoneValues.join("");
  //   const phoneError = validateFormValue("phone", phoneValue);
  //   if (phoneError !== "") {
  //     newErrors.phone = phoneError;
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     alert("Please fix the errors in the form");
  //     setErrors(newErrors);
  //   } else {
  //     const { firstName, lastName, email, city } = textValues;

  //     updateUser({
  //       firstName,
  //       lastName,
  //       email,
  //       city,
  //       phone: phoneValue,
  //     });
  //     setTextValues(initFormValues.text);
  //     setPhoneValues(initFormValues.phone as PhoneValues);
  //     setErrors({});
  //   }
  // };

  return (
    <form>
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
      <ErrorMessage
        message={firstNameErrorMessage}
        show={firstNameErrorMessage !== ""}
      />

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
      <ErrorMessage
        message={lastNameErrorMessage}
        show={lastNameErrorMessage !== ""}
      />

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
      <ErrorMessage
        message={emailErrorMessage}
        show={emailErrorMessage !== ""}
      />

      {/* City Input */}
      <FunctionalTextInput
        label={"City"}
        labelFor={"city"}
        inputProps={{
          id: "city",
          placeholder: "Hobbiton",
          value: city,
          onChange: (e) => {
            changeFormValues("city", e.target.value);
          },
        }}
      />
      <ErrorMessage message={cityErrorMessage} show={cityErrorMessage !== ""} />

      {/* <div className="input-wrap">
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
      </div> */}

      {/* <ErrorMessage message={errors.phone} show={errors.phone !== undefined} /> */}

      <input type="submit" value="Submit" />
    </form>
  );
};
