export interface LoginRequestI {
  username: string;
  password: string;
}

export interface LoginResponseI {
  id_token: string;
  refresh_token: string;
  access_token: string;
}

export interface LogoutRequestI {
  access_token: string;
}

export interface RegisterRequestI {
  login: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  city: string;
  dayOfBirth: number | null;
  bio: string;
  socialMedia: {
    first: string;
    second: string;
    third: string;
  };
  interests: string[];
}

export interface RegisterResponseI {
  id_token: string;
  refresh_token: string;
  access_token: string;
}
