export function isEmailValid(emailAddress: string) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !!emailAddress.match(regex);
}

export function isPhoneValid(phoneNumber: string) {
    const regex = /^\d{7}$/;
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