import { Session } from '../../../../shared/models/auth.model';

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  street: string;
  building: string;
  city: string;
  postal_code: string;
  country: string;
}
export type RegisterResponse = Session;

export enum RegisterStep {
  Credentials,
  PersonalData,
  Address
}

export const nextStepsMap: Map<RegisterStep, RegisterStep> = new Map([
  [RegisterStep.Credentials, RegisterStep.PersonalData],
  [RegisterStep.PersonalData, RegisterStep.Address],
]);

export const previousStepsMap: Map<RegisterStep, RegisterStep> = new Map([
  [RegisterStep.Address, RegisterStep.PersonalData],
  [RegisterStep.PersonalData, RegisterStep.Credentials],
]);
