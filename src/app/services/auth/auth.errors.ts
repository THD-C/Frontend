import { ApiError } from '../../shared/models/error.model';

export const errors: ApiError = {
  'email_or_username_occupied': $localize`:@@auth-errors.E-mail-or-username-already-occupied:E-mail or username already occupied`,
  'invalid_credentials': $localize`:@@auth-erros.Credentials-are-invalid-Please-try-again-or-create-account:Credentials are invalid. Please try again or create account`,
}
