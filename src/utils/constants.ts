export const textInputs = [
  { key: "firstName", label: "First Name", placeholder: "Bilbo" },
  { key: "lastName", label: "Last Name", placeholder: "Baggins" },
  {
    key: "email",
    label: "Email",
    placeholder: "bilbo-baggins@adventurehobbits.net",
  },
  { key: "city", label: "City", placeholder: "Hobbiton" },
];

export const phoneInputs = [
  "phone-input-1",
  "phone-input-2",
  "phone-input-3",
  "phone-input-4",
];

export const initFormValues = {
  text: {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: "",
  },
  phone: ["", "", "", ""],
};
