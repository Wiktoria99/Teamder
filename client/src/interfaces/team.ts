export interface TeamI {
  id: number;
  host?: string;
  cost_per_person?: number;
  description?: string;
  name?: string;
  host_profile_picture_url?: string;
  expiration_date?: string;
  location?: string;
  longitude?: number;
  latitude?: number;
  list_of_interests_id?: number[];
  waiting_people_id?: number[];
  accepted_people_id?: number[];
  size?: number;
}

export interface CreateTeamI {
  name: string;
  description: string;
  expiration_date: Date;
  location: string;
  longitude: number;
  latitude: number;
  cost_per_person: number;
  size: number;
  list_of_interests: number[];
  host_profile_picture_url: string;
  waiting_people: number[];
  accepted_people: number[];
}

export interface CreateTeamResponseI {}
