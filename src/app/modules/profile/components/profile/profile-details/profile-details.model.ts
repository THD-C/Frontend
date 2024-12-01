export type UserProfileDetails = {
  id: string;
  username: string;
  email: string;
  name: string;
  surname: string;
  street: string;
  building: string;
  city: string;
  postal_code: string;
  country: string;
}

export type UpdateProfileDetailsRequest = UserProfileDetails;
