import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

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
  @ViewChild('scrollContainer', { read: ElementRef })
  scrollContainer!: ElementRef;

  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  /**
   * Fetches all movies from the API and stores them locally.
   */
  loadMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp) => {
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
   * @param director Director object to pass to dialog
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorComponent, {
      data: director,
      width: '400px',
    });
  }

  /**
   * Opens a dialog displaying genre details.
   * @param genre Genre object to pass to dialog
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreComponent, {
      data: genre,
      width: '400px',
    });
  }

  /**
   * Opens a dialog displaying the movie synopsis.
   * @param movie Movie object to pass to dialog
   */
  openMovieSynopsisDialog(movie: any): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: movie,
      width: '400px',
    });
  }

  /**
   * Adds a movie to the user's favourites.
   * @param movieId ID of the movie to add
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
