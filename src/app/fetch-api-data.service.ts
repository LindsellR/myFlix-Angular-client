import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Movie, Director, Genre } from './models/movie.model';
import { User, LoginCredentials } from './models/user.model';

// Base URL for API requests
const apiUrl = 'https://movie-geeks-one.vercel.app/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  // AUTHENTICATION ENDPOINTS

  /** 
   * Register a new user
   * @param userDetails The details of the user registering (Username, Password, Email, Birthdate)
   * @returns An observable containing the newly registered user.
   */
  public userRegistration(userDetails: User): Observable<User> {
    return this.http
      .post<User>(`${apiUrl}users`, userDetails)
      .pipe(catchError(this.handleError<User>));
  }

  /** 
   * Login existing user and receive JWT token
   * @param userDetails The Username and Password of a user
   * @returns An observable containing the token and user data.
   */
  public userLogin(
    userDetails: LoginCredentials
  ): Observable<{ token: string; user: User }> {
    return this.http
      .post<{ token: string; user: User }>(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError<{ token: string; user: User }>));
  }

  // MOVIE-RELATED ENDPOINTS

  /** 
   * Get full list of movies
   * @returns An observable containing all movies in the database.
   */
  public getAllMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${apiUrl}movies`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData<Movie[]>),
        catchError(this.handleError<Movie[]>)
      );
  }

  /** 
   * Get details for a single movie by ID
   * @param movieId - The ID of the selected movie.
   * @returns An observable containing the movie details.
   */
  public getMovie(movieId: string): Observable<Movie> {
    return this.http
      .get<Movie>(`${apiUrl}movies/${movieId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map(this.extractResponseData<Movie>),
        catchError(this.handleError<Movie>)
      );
  }

  /** 
   * Get genre details by name
   * @param genre - The genre name.
   * @returns An observable containing genre information.
   */
  public getGenre(genre: string): Observable<Genre> {
    return this.http
      .get<Genre>(`${apiUrl}genre/${genre}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData<Genre>),
        catchError(this.handleError<Genre>)
      );
  }

  /**
   * Get director details by name.
   * @param director - The director's name.
   * @returns An observable containing director information.
   */
  public getDirector(director: string): Observable<Director> {
    return this.http
      .get<Director>(`${apiUrl}director/${director}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map(this.extractResponseData<Director>),
        catchError(this.handleError<Director>)
      );
  }

  // USER ACCOUNT ENDPOINTS

  /**
   * Fetch user details by username.
   * @param username - The username of the user.
   * @returns An observable containing user details.
   */
  public getUser(username: string): Observable<User> {
    return this.http
      .get<User>(`${apiUrl}users/${username}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map(this.extractResponseData<User>),
        catchError(this.handleError<User>)
      );
  }

  /**
   * Edit user account details.
   * @param username - The username of the user to edit.
   * @param userDetails - The user details to update (e.g., password, email, username).
   * @returns An observable containing the updated user.
   */
  public editUser(username: string, userDetails: any): Observable<User> {
    return this.http
      .put<User>(`${apiUrl}users/${username}`, userDetails, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map(this.extractResponseData<User>),
        catchError(this.handleError<User>)
      );
  }

  /**
   * Delete a user account.
   * @param username - The username of the user to delete.
   * @returns An observable confirming deletion.
   */
  public deleteUser(username: string): Observable<User> {
    return this.http
      .delete<User>(`${apiUrl}users/${username}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map(this.extractResponseData<User>),
        catchError(this.handleError<User>)
      );
  }

  // FAVORITES MANAGEMENT

  /**
   * Add a movie to the user's favorites.
   * @param username - The username of the user.
   * @param movieId - The ID of the movie to add.
   * @returns An observable containing the updated user with the new favorite.
   */
  public addFavouriteMovie(
    username: string,
    movieId: string
  ): Observable<User> {
    return this.http
      .post<User>(`${apiUrl}users/${username}/movies/${movieId}`, null, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map(this.extractResponseData<User>),
        catchError(this.handleError<User>)
      );
  }

  /**
   * Remove a movie from the user's favorites.
   * @param username - The username of the user.
   * @param movieId - The ID of the movie to remove.
   * @returns An observable containing the updated user without the removed movie.
   */
  public deleteFavouriteMovie(
    username: string,
    movieId: string
  ): Observable<User> {
    return this.http
      .delete<User>(`${apiUrl}users/${username}/movies/${movieId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map(this.extractResponseData<User>),
        catchError(this.handleError<User>)
      );
  }

  // HELPER METHODS

    /**
   * Get authorization headers with JWT token from local storage.
   * @returns An HttpHeaders object containing the Authorization header.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

    /**
   * Extracts and returns response data.
   * @param res - The raw response object.
   * @returns The extracted response object or an empty object if null.
   */
  private extractResponseData<T>(res: T): T {
    return res || ({} as T);
  }

  /**
   * Handles HTTP errors and logs details.
   * @param error - The HTTP error response.
   * @returns An observable with a user-facing error message.
   */
  private handleError<T>(error: HttpErrorResponse): Observable<T> {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Server error (status ${error.status}): ${error.error}`);
    }
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
