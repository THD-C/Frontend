export const minLength: number = 12;
export const minLengthErrorMessage: string = $localize`:@@password-strength-validator.Password-must-be-at-least-12-characters-long:Password must be at least 12 characters long`;

export const validatePassword = function (password: string): string[] {
  const validationResult: [boolean, string][] = [
    [password.length >= minLength, minLengthErrorMessage],
  ]

  return validationResult
    .filter(([key]) => key === false)
    .map(([key, value]) => value);
}
