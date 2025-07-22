/**
 * Represents a registered user's details(Email, Username, Password, Birthdate, Favourite Movies).
 */
export interface User {
  Email: string;
  Username: string;
  Password?: string;
  Birthday?: string; // optional
  FavouriteMovies?: string[]; // movie IDs
}
/**
 * Represents the credentials required for a user login (Username and Password).
 */
export interface LoginCredentials {
  Username: string;
  Password: string;
}