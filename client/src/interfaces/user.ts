export interface ProfileI {
  id: number;
  user_name: string;
  name: string;
  surname: string;
  email?: string;
  location: string;
  age: number | null;
  photo_src: string;
  bio: string;
  rating: number;
  social_media_URL1: string;
  social_media_URL2: string;
  social_media_URL3: string;
  list_of_interests_id: number[];
}

export interface EditI {
  name: string;
  surname: string;
  location: string;
  age: number | null;
  photo_src: string;
  bio: string;
  social_media_URL1: string;
  social_media_URL2: string;
  social_media_URL3: string;
  list_of_interests: number[];
}

export interface EditResponseI {
  response: string;
}

export interface MyTeamProfilesRequestI {
  user_ids: number[];
}

export interface RateUserRequestI {
  user_name: string;
  rate: number;
}

export interface RateUserResponseI {
  yourRate: number;
  rating: number;
}
