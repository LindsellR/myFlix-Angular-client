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
export interface Director {
  Name?: string;
  Bio?: string;
  Born?: Date;
  Died?: Date;
}
export interface Genre {
  Name?: string;
  Description?: string;
}
