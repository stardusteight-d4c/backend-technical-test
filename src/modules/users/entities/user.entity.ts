export enum UserType {
  OWNER = 'owner',
  CUSTOMER = 'customer',
}

export class User {
  id: string;
  name: string;
  email: string;
  type: UserType;
}
