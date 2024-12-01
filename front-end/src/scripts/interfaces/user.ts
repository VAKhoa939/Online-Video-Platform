export interface User {
  id: string;
  email: string;
  password: string;
  watchedList: string[];
}

export const defaultUser: User = {
  id: "000",
  email: "",
  password: "",
  watchedList: [],
};
