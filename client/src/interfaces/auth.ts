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
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface RegisterResponseI {
  id_token: string;
  refresh_token: string;
  access_token: string;
}
