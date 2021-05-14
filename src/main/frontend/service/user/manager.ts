
export interface IUser {
  id: number|string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
}

export function getUser(id: number|string) : IUser {
  return { id, firstName: 'Adam' }
}