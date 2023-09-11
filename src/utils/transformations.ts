export const capitalize = (string: string) => {
  // todo: build this function
  // `capitalize("jOn")` should output `"Jon"`
  const firstLetter = string[0].toUpperCase();
  const restOfWord = string.slice(1).toLowerCase();
  return firstLetter + restOfWord;
};

export const formatPhoneNumber = (phoneNumber: string) => {
  // todo: build this function
  // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`
  const firstPart = phoneNumber.slice(0, 2);
  const secondPart = phoneNumber.slice(2, 4);
  const thirdPart = phoneNumber.slice(4, 6);
  const fourthPart = phoneNumber.slice(6, 7);
  return `${firstPart}-${secondPart}-${thirdPart}-${fourthPart}`;
};
