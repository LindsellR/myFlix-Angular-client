import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIcon } from '@angular/material/icon';

import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

import { Movie, Director, Genre } from '../models/movie.model';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  imports: [
    MatCardModule,
    MatDialogModule,
    CommonModule,
    MatIconModule,
    MatIcon,
  ],
})
export class MovieCardComponent implements OnInit {
  /**
   * Reference to the scrollable movie container element.
   */
  @ViewChild('scrollContainer', { read: ElementRef })
  scrollContainer!: ElementRef;

  /**
   * Array of movies retrieved from the API.
   */
  movies: Movie[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  /**
   * Lifecycle hook. Loads movies on component initialization.
   */
  ngOnInit(): void {
    this.loadMovies();
  }

  /**
   * Fetches all movies from the API and stores them locally.
   */
  loadMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp: Movie[]) => {
        this.movies = resp;
        console.log('Movies loaded:', this.movies);
      },
      error: (error) => {
        console.error('Failed to load movies:', error);
      },
    });
  }

  /**
   * Scrolls the movie container left by 300px smoothly.
   */
  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  /**
   * Scrolls the movie container right by 300px smoothly.
   */
  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }

  /**
   * Opens a dialog displaying director details.
   * @param director - The director object to display.
   */
  openDirectorDialog(director: Director): void {
    this.dialog.open(DirectorComponent, {
      data: director,
      width: '400px',
    });
  }

  /**
   * Opens a dialog displaying genre details.
   * @param genre - The genre object to display.
   */
  openGenreDialog(genre: Genre): void {
    this.dialog.open(GenreComponent, {
      data: genre,
      width: '400px',
    });
  }

  /**
   * Opens a dialog displaying the movie synopsis.
   * @param movie - The movie object to display.
   */
  openMovieSynopsisDialog(movie: Movie): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: movie,
      width: '400px',
    });
  }

  /**
   * Adds a movie to the user's list of favourites.
   * @param movieId - The ID of the movie to add.
   */
  addToFavourites(movieId: string): void {
    const username = localStorage.getItem('user') || '';
    this.fetchApiData.addFavouriteMovie(username, movieId).subscribe({
      next: (res) => {
        console.log('Added to favourites:', res);
        alert('Movie added to favourites!');
      },
      error: (err) => {
        console.error('Error adding to favourites:', err);
        alert('Could not add to favourites.');
      },
    });
  }
}
