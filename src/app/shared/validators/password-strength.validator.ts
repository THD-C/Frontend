export const lowerCaseRegex: RegExp = /[a-z]+/;
export const lowerCaseNoMatchErrorMessage: string = 'Password must contain at least 1 lower case character';

export const upperCaseRegex: RegExp = /[A-Z]+/;
export const upperCaseNoMatchErrorMessage: string = 'Password must contain at least 1 upper case character';

export const digitRegex: RegExp = /\d+/;
export const digitNoMatchErrorMessage: string = 'Password must contain at least 1 digit';

export const specialCharRegex: RegExp = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
export const specialCharNoMatchErrorMessage: string = 'Password must contain at least 1 special character';

export const minLength: number = 8;
export const minLengthErrorMessage: string = 'Password must be at least 8 characters long';

export const validatePassword = function (password: string): string[] {
  const validationResult: [boolean, string][] = [
    [lowerCaseRegex.test(password), lowerCaseNoMatchErrorMessage],
    [upperCaseRegex.test(password), upperCaseNoMatchErrorMessage],
    [digitRegex.test(password), digitNoMatchErrorMessage],
    [specialCharRegex.test(password), specialCharNoMatchErrorMessage],
    [password.length >= minLength, minLengthErrorMessage],
  ]

  return validationResult
    .filter(([key]) => key === false)
    .map(([key, value]) => value);
}
