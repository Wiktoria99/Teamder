export interface TeamI {
  id: number;
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
  name: string;
  description: string;
  expiration_date: Date;
  location: {
    address: string;
    longitude: number;
    latitude: number;
  };
  cost_per_person: number;
  size: number;
  interests: string[];
}

export interface CreateTeamResponseI {}
