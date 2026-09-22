export interface Password {
  _id?: string;
  password: string | null;
  title: string;
  section?: string;
  username?: string;
  email?: string;
  visible?: boolean;
}

export interface PasswordCreate {
  password: string;
  title: string;
  section: string;
  username?: string;
  email?: string;
}

export interface PasswordUpdate {
  password?: string;
  title?: string;
  username?: string;
  email?: string;
}

export interface Section {
  _id?: string;
  title: string;
  user?: string;
  creationDate?: Date;
}

export interface SectionCreate {
  title: string;
}

export interface SectionUpdate {
  title: string;
}
