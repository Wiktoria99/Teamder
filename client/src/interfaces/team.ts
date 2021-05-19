export interface TeamI {
  host: string;
  photoSource: string;
  title: string;
  date: string;
  location: string;
  maxSize: number;
  curSize: number;
  interests: string[];
}

export interface CreateTeamI {
  host: string;
  title: string;
  date: string;
  location: string;
  maxSize: number;
  description: string;
  interests: string[];
}
