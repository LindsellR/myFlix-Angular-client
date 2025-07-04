export interface User {
  _id: string;
  Email: string;
  Username: string;
  password: string;
  birthday?: string; // optional
  FavoriteMovies?: string[]; // movie IDs
}
export interface LoginCredentials {
  Username: string;
  Password: string;
}