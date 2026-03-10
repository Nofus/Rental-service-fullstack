export type UserData = {
  id: string;
  email: string;
  username: string;       
  avatarUrl: string | null;
  isPro: boolean;
  token: string;
};

export type AuthData = {
  email: string;
  password: string;
};