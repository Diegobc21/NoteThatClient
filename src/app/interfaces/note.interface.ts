export interface Note {
  _id: string;
  title: string;
  content: string;
  creationDate: string;
  user: string;
  updatedAt?: string;
}

export interface NoteDraft {
  title: string;
  content: string;
}
