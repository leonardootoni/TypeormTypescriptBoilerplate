/**
 * Password and Password Confirmation are optionals, being required only for create a new User.
 * User Password will be updated only through a changePassword procedure.
 */
export interface UserData {
  id?: number;
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  blocked: boolean;
}
