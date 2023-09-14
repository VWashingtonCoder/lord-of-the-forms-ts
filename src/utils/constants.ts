export const textInputs = [
  { key: "firstName", label: "First Name", placeholder: "Bilbo" },
  { key: "lastName", label: "Last Name", placeholder: "Baggins" },
  {
    key: "email",
    label: "Email",
    placeholder: "bilbo-baggins@adventurehobbits.net",
  },
  { key: "city", label: "City", placeholder: "Hobbiton" },
] as const;

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

export const errorMessages = {
  firstName: "First name must be at least 2 characters long",
  lastName: "Last name must be at least 2 characters long",
  email: "Email is Invalid",
  city: "State is Invalid",
  phone: "Invalid Phone Number",
};