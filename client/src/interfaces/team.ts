export interface TeamI {
  host?: string;
  cost_per_person?: number;
  description?: string;
  name?: string;
  //   photoSource: string;
  expiration_date?: string;
  //   location: string;
  list_of_interests_id?: number[];
  waiting_people_id?: number[];
  accepted_people_id?: number[];
  size?: number;
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
