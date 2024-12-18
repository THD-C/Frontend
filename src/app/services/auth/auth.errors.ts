import { ApiError } from '../../shared/models/error.model';

export const errors: ApiError = {
  'email_or_username_occupied': $localize`:@@auth-errors.E-mail-or-username-already-occupied:E-mail or username already occupied`,
  'invalid_credentials': $localize`:@@auth-erros.Credentials-are-invalid-Please-try-again-or-create-account:Credentials are invalid. Please try again or create account`,
  'invalid_token': $localize`:@@auth-errors.Could-not-authenticate-with-external-provider-Please-try-again-or-contact-support:Could not authenticate with external provider. Please try again or contact support`,
}
