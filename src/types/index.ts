export interface RandomUserOptions {
  results?: number;
  gender?: "male" | "female";
  nat?: string;
}

export interface UserName {
  title: string;
  first: string;
  last: string;
}

export interface UserLocation {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: string | number;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  timezone: {
    offset: string;
    description: string;
  };
}

export interface UserDob {
  date: string;
  age: number;
}

export interface User {
  gender: string;
  name: UserName;
  location: UserLocation;
  email: string;
  dob: UserDob;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export interface RandomUserResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}
