export type UserInformation = {
  [firstName: string]: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
};

export type StringObject = {
  [key: string]: string;
};

export type TextValues = {
  [firstName: string]: string;
  lastName: string;
  email: string;
  city: string;
};

export type PhoneValues = [string, string, string, string];
