export interface User {
  email: string;
  password: string;
  location?: {
    lat: string,
    lng: string
  };
}
