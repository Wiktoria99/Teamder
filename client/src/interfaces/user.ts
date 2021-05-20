export interface ProfileI {
  name: string;
  surname: string;
  username: string;
  photoSource: string;
  bio: string;
  age: number;
  city: string;
  likes: number;
  interests: string[];
  socialMedia: {
     first: string;
     second: string;
     third: string;
  };
}