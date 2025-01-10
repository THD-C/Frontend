import { ApiError } from '../../shared/models/error.model';

export const errors: ApiError = {
  'email_or_username_occupied': $localize`:@@auth-errors.E-mail-or-username-already-occupied:E-mail or username already occupied`,
  'invalid_credentials': $localize`:@@auth-erros.Credentials-are-invalid-Please-try-again-or-create-account:Credentials are invalid. Please try again or create account`,
  'invalid_token': $localize`:@@auth-errors.Could-not-authenticate-with-external-provider-Please-try-again-or-contact-support:Could not authenticate with external provider. Please try again or contact support`,
  'common_password': $localize`:@@auth-errors.It-looks-like-the-password-you've-entered-is-very-common-and-could-be-easily-guessed-by-attackers-For-your-security-please-choose-a-more-unique-and-complex-password-that-includes-a-mix-of-letters-numbers-and-special-characters:It looks like the password you've entered is very common and could be easily guessed by attackers. For your security, please choose a more unique and complex password that includes a mix of letters, numbers, and special characters`,
  'password_length_too_short': $localize`:@@auth-errors.Password-is-too-short-12-chars-required:Password is too short. 12 chars required`,
}
