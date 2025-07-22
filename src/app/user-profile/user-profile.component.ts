import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

/**
 * Displays and manages the user's profile, including personal details,
 * favorite movies, and update functionality.
 */
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  /**
   * Stores the currently logged-in user's data.
   */
  user: any = {};

  /**
   * Stores the list of the user's favorite movies.
   */
  favouriteMovies: any[] = [];

  /**
   * Stores a preview of the selected profile image (Base64 or Blob URL).
   */
  profileImagePreview: string | ArrayBuffer | null = null;

  /**
   * Indicates whether a profile image has been selected for preview.
   */
  profileImageSelected = false;

  /**
   * Constructs the component and injects dependencies.
   * @param fetchApiData Service for API communication
   * @param snackBar Material snack bar for showing notifications
   * @param dialog Material dialog service for showing modals
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  /**
   * Initializes the component by loading the user's data and favorite movies.
   */
  ngOnInit(): void {
    this.getUserData();
  }

  /**
   * Retrieves the user's data and filters their favorite movies.
   */
  getUserData(): void {
    const username = localStorage.getItem('user') || '';
    this.fetchApiData.getUser(username).subscribe((resp) => {
      this.user = resp;
      const favMovieIds = resp.FavouriteMovies || [];

      this.fetchApiData.getAllMovies().subscribe((allMovies) => {
        this.favouriteMovies = allMovies.filter((movie: any) =>
          favMovieIds.includes(movie._id)
        );
      });
    });
  }

  /**
   * Handles file selection and previews the chosen profile image.
   * @param event File input change event
   */
  onProfileImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImagePreview = reader.result;
        this.profileImageSelected = true;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  /**
   * Clears the selected profile image preview.
   */
  deleteProfileImage(): void {
    this.profileImagePreview = null;
    this.profileImageSelected = false;
  }

  /**
   * Updates the user's profile with the new information.
   * Only includes the password if it was entered.
   */
  updateUser(): void {
    const oldUsername = localStorage.getItem('user') || '';
    const cleanUser: any = {
      Username: this.user.Username,
      Email: this.user.Email,
    };

    if (this.user.Password && this.user.Password.trim() !== '') {
      cleanUser.Password = this.user.Password;
    }

    this.fetchApiData.editUser(oldUsername, cleanUser).subscribe({
      next: (result) => {
        this.snackBar.open('Update successful', 'OK', { duration: 2000 });

        this.fetchApiData.getUser(cleanUser.Username).subscribe((user) => {
          user.Password = undefined;
          this.user = user;
          localStorage.setItem('user', user.Username);
        });
      },
      error: (result) => {
        this.snackBar.open('Update failed: ' + result.error, 'OK', {
          duration: 2000,
        });
      },
    });
  }

  /**
   * Removes a movie from the user's list of favorites.
   * @param movieId ID of the movie to remove
   */
  removeFavourite(movieId: string): void {
    const username = localStorage.getItem('user') || '';
    this.fetchApiData.deleteFavouriteMovie(username, movieId).subscribe(() => {
      this.favouriteMovies = this.favouriteMovies.filter(
        (m) => m._id !== movieId
      );
    });
  }

  /**
   * Opens a dialog with information about the movie's director.
   * @param director Director data object
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorComponent, { data: director });
  }

  /**
   * Opens a dialog with information about the movie's genre.
   * @param genre Genre data object
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreComponent, { data: genre });
  }

  /**
   * Opens a dialog with the movie synopsis.
   * @param movie Movie data object
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(MovieSynopsisComponent, { data: movie });
  }
}
