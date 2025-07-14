// Represents user details
export interface User {
  Email: string;
  Username: string;
  Password?: string;
  Birthday?: string; // optional
  FavouriteMovies?: string[]; // movie IDs
}
export interface LoginCredentials {
  Username: string;
  Password: string;
}