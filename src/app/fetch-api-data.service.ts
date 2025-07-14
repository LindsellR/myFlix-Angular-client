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

  /** Register a new user */
  public userRegistration(userDetails: User): Observable<User> {
    return this.http
      .post<User>(`${apiUrl}users`, userDetails)
      .pipe(catchError(this.handleError<User>));
  }

  /** Login existing user and receive JWT token */
  public userLogin(userDetails: LoginCredentials): Observable<{ token: string; user: User }> {
    return this.http
      .post<{ token: string; user: User }>(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError<{ token: string; user: User }>));
  }


  // MOVIE-RELATED ENDPOINTS

  /** Get full list of movies */
  public getAllMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${apiUrl}movies`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData<Movie[]>),
        catchError(this.handleError<Movie[]>)
      );
  }

  /** Get details for a single movie by ID */
  public getMovie(movieId: string): Observable<Movie> {
    return this.http
      .get<Movie>(`${apiUrl}movies/${movieId}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData<Movie>),
        catchError(this.handleError<Movie>)
      );
  }

  /** Get genre details by name */
  public getGenre(genre: string): Observable<Genre> {
    return this.http
      .get<Genre>(`${apiUrl}genre/${genre}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData<Genre>),
        catchError(this.handleError<Genre>)
      );
  }

  /** Get director details by name */
  public getDirector(director: string): Observable<Director> {
    return this.http
      .get<Director>(`${apiUrl}director/${director}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData<Director>),
        catchError(this.handleError<Director>)
      );
  }

  
  // USER ACCOUNT ENDPOINTS
  
  /** Fetch user details by username */
  public getUser(username: string): Observable<User> {
    return this.http
      .get<User>(`${apiUrl}users/${username}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData<User>),
        catchError(this.handleError<User>)
      );
  }

  /** Edit user account details */
  public editUser(username: string, userDetails: any): Observable<User> {
    return this.http
      .put<User>(`${apiUrl}users/${username}`, userDetails, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData<User>),
        catchError(this.handleError<User>)
      );
  }

  /** Delete a user account */
  public deleteUser(username: string): Observable<User> {
    return this.http
      .delete<User>(`${apiUrl}users/${username}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData<User>),
        catchError(this.handleError<User>)
      );
  }

  
  // FAVORITES MANAGEMENT

  /** Add a movie to the user's favorites */
  public addFavouriteMovie(username: string, movieId: string): Observable<User> {
    return this.http
      .post<User>(`${apiUrl}users/${username}/movies/${movieId}`, null, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData<User>),
        catchError(this.handleError<User>)
      );
  }

  /** Remove a movie from the user's favorites */
  public deleteFavouriteMovie(username: string, movieId: string): Observable<User> {
    return this.http
      .delete<User>(`${apiUrl}users/${username}/movies/${movieId}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData<User>),
        catchError(this.handleError<User>)
      );
  }

  
  // HELPER METHODS

  /** Get authorization header with JWT token */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  /** Extracts and returns response data */
  private extractResponseData<T>(res: T): T {
    return res || ({} as T);
  }

  /** Handles HTTP errors and logs details */
  private handleError<T>(error: HttpErrorResponse): Observable<T> {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Server error (status ${error.status}): ${error.error}`);
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
