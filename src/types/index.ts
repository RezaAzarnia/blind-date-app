export interface UserInfo {
  gender: string;
  name: string;
  age: number | null;
  bio: string;
  city: string;
}
export interface UserData extends Omit<UserInfo, "name"> {
  app_data: string | undefined;
  height: number;
  favorites: string[];
  jobs: string[];
  fname: string;
  photos: string;
}
