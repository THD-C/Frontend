import { ApiError } from '../../shared/models/error.model';

export const errors: ApiError = {
  'operation_failed': $localize`:@@blogs-errors.Operation-failed-Please-try-again:Operation failed. Please try again`,
  'unauthorized_user_for_method': $localize`:@@blogs-errors.User-does-not-have-enought-priviliges:User does not have enought priviliges`,
}
