import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Movie, Director, Genre } from './models/movie.model';
import { User, LoginCredentials } from './models/user.model';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-geeks-one.vercel.app/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: User): Observable<User> {
    console.log(userDetails);
    return this.http
      .post<User>(`${apiUrl}users`, userDetails)
      .pipe(catchError(this.handleError<User>));
  }

  // Non-typed response extraction
  private extractResponseData<T>(res: T): T {
    const body = res;
    return body || ({} as T);
  }

  private handleError<T>(error: HttpErrorResponse): Observable<T> {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  public userLogin(userDetails: LoginCredentials): Observable<User> {
    console.log(userDetails);
    return this.http
      .post<User>(`${apiUrl}login`, userDetails)
      .pipe(catchError(this.handleError<User>));
  }

  public getAllMovies(): Observable<Movie[]> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Movie[]>(`${apiUrl}movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData<Movie[]>),
        catchError((error) => this.handleError<Movie[]>(error))
      );
  }

  public getMovie(movieId: string): Observable<Movie> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Movie>(`${apiUrl}movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData<Movie>),
        catchError((error) => this.handleError<Movie>(error))
      );
  }

  public getDirector(director: string): Observable<Director> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Director>(`${apiUrl}director/${director}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData<Director>),
        catchError((error) => this.handleError<Director>(error))
      );
  }

  public getGenre(genre: string): Observable<Genre> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Genre>(`${apiUrl}genre/${genre}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData<Genre>),
        catchError((error) => this.handleError<Genre>(error))
      );
  }

  public getUser(username: string): Observable<User> {
    const token = localStorage.getItem('token');
    return this.http
      .get<User>(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData<User>),
        catchError((error) => this.handleError<User>(error))
      );
  }

  public addFavouriteMovie(
    username: string,
    movieId: string
  ): Observable<User> {
    const token = localStorage.getItem('token');
    return this.http
      .post<User>(`${apiUrl}users/${username}/movies/${movieId}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData<User>),
        catchError((error) => this.handleError<User>(error))
      );
  }

  public editUser(username: string, userDetails: any): Observable<User> {
    const token = localStorage.getItem('token');
    return this.http
      .put<User>(`${apiUrl}users/${username}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData<User>),
        catchError((error) => this.handleError<User>(error))
      );
  }

  public deleteUser(username: string): Observable<User> {
    const token = localStorage.getItem('token');
    return this.http
      .delete<User>(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData<User>),
        catchError((error) => this.handleError<User>(error))
      );
  }

  public deleteFavouriteMovie(
    username: string,
    movieId: string
  ): Observable<User> {
    const token = localStorage.getItem('token');
    return this.http
      .delete<User>(`${apiUrl}users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData<User>),
        catchError((error) => this.handleError<User>(error))
      );
  }
}
