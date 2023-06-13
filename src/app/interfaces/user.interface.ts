export interface User {
  fullname: string;
  email: string;
  password: string;
  admin?: boolean;
  friends?: string[]; // Array de identificadores de amigos
  friendRequests?: FriendRequest[]; // Array de solicitudes de amistad
}

export interface FriendRequest {
  senderId: string;
  status: FriendStatus;
}

export enum FriendStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED ='rejected'
}
