import { capitalize } from "./transformations";
import { allCities } from "./all-cities";
import { StringObject } from "../types";

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isCityValid(city: string) {
  const capitalizedCity = capitalize(city);
  return allCities.includes(capitalizedCity);
}

export function isPhoneValid(phoneNumber: string) {
  const regex = /^[0-9]{7}$/;
  return !!phoneNumber.match(regex);
}

export function containsOnlyNumbers(input: string) {
  const regex = /^\d+$/;
  return !!input.match(regex);
}

export function containsOnlyLetters(input: string) {
  const regex = /^[a-zA-Z]+$/;
  return !!input.match(regex);
}

export function validateFormValue(key: string, value: string) {
  const errorMessages: StringObject = {
    firstName: "First name must be at least 2 characters long",
    lastName: "Last name must be at least 2 characters long",
    email: "Email is Invalid",
    city: "State is Invalid",
    phone: "Invalid Phone Number",
  };
  let errorMessage = "";

  if (value.length === 0) {
    errorMessage = errorMessages[key];
  } else if ((key === "firstName" || key === "lastName") && value.length < 2) {
    errorMessage = errorMessages[key];
  } else if (key === "email" && !isEmailValid(value)) {
    errorMessage = errorMessages.email;
  } else if (key === "city" && !isCityValid(value)) {
    errorMessage = errorMessages.city;
  } else if (key === "phone" && !isPhoneValid(value)) {
    errorMessage = errorMessages.phone;
  }

  return errorMessage;
}
