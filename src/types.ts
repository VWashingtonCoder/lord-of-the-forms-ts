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

export type FormProps = {
  updateUser: (newUser: UserInformation) => void;
};

export type TextInputProps = {
  name: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (key: string, value: string) => void;
};

export type PhoneInputProps = {
  id: string;
  idx: number;
  value: string;
  onChange: (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  refGroup: React.RefObject<HTMLInputElement>[] | null;
};
