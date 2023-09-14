import { capitalize } from "./transformations";
import { allCities } from "./all-cities";

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isCityValid(city: string) {
  if (city.length !== 0) {
    const capitalizedCity = capitalize(city);
    return allCities.includes(capitalizedCity);
  } else return false;
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
  let valid = true;

  if (value.length === 0) {
    valid = false;
  } else if ((key === "firstName" || key === "lastName") && value.length < 2) {
    valid = false;
  } else if (key === "email" && !isEmailValid(value)) {
    valid = false;
  } else if (key === "city" && !isCityValid(value)) {
    valid = false;
  } else if (key === "phone" && !isPhoneValid(value)) {
    valid = false;
  }

  return valid;
}
