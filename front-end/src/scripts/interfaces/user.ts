import { Video } from "./video";

export interface User {
  _id: string;
  userName: string;
  email: string;
  password: string;
  avatar: string;
  videoHistory: Video[];
  isAdmin: boolean;
}

export const defaultUser: User = {
  _id: "",
  userName: "",
  email: "",
  password: "",
  avatar: "",
  videoHistory: [] as Video[],
  isAdmin: false,
};
