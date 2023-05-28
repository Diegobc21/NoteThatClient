export interface User {
  fullname: string,
  email: string,
  password: string,
  admin?: boolean,
  actualToken?: string
}
