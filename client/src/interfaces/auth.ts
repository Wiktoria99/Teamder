export interface LoginRequestI {
  username: string;
  password: string;
}

export interface LoginResponseI {
  token: string;
}

export interface LogoutRequestI {
  token: string;
}

export interface RegisterRequestI {
  user_name: string;
  password: string;
  password2: string;
  name: string;
  surname: string;
  email: string;
  location: string;
  age: number | null;
  photo_src: string;
  bio: string;
  social_media_URL1: string;
  social_media_URL2: string;
  social_media_URL3: string;
  list_of_interests: string[];
}

export interface RegisterResponseI {
  response: string;
  user_name: string;
  email: string;
  token: string;
}
