export interface Password {
  _id?: string;
  password: string;
  title: string;
  section?: string;
  username?: string;
  email?: string;
  visible?: boolean;
}

export interface Section {
  _id?: string;
  title: string;
  user?: string;
  creationDate?: Date;
}
