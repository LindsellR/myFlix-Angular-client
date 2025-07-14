/**
 * Represents a Movie with optional nested Director and Genre.
 */
export interface Movie {
  _id?: string;
  Title: string;
  Description: string;
  Genre?: Genre;
  Director?: Director;
  Actors?: string[];
  ImageURL?: string;
  Featured?: boolean;
}

/**
 * Represents a Director with biographical details.
 */
export interface Director {
  Name?: string;
  Bio?: string;
  Born?: Date;
  Died?: Date;
}

/**
 * Represents a Genre with a name and description.
 */
export interface Genre {
  Name?: string;
  Description?: string;
}
