import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

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
  user: any = {};
  favouriteMovies: any[] = [];
  profileImagePreview: string | ArrayBuffer | null = null; // For image preview

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

 getUserData(): void {
  const username = localStorage.getItem('user') || '';
  this.fetchApiData.getUser(username).subscribe((resp) => {
    this.user = resp;
    const favMovieIds = resp.FavouriteMovies || [];

    // Fetch all movies and filter to only the favorites
    this.fetchApiData.getAllMovies().subscribe((allMovies) => {
      this.favouriteMovies = allMovies.filter((movie: any) =>
        favMovieIds.includes(movie._id)
      );
    });
  });
}

  // Image upload handler to preview and prepare for upload

profileImageSelected = false;

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

deleteProfileImage(): void {
  this.profileImagePreview = null;
  this.profileImageSelected = false;
}

updateUser(): void {
  const oldUsername = localStorage.getItem('user') || '';

  // Build cleanUser payload, only add Password if non-empty string
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

      // Refresh user data with new username after update
      this.fetchApiData.getUser(cleanUser.Username).subscribe((user) => {
        user.Password = undefined;
        this.user = user;
        localStorage.setItem('user', user.Username);
      });
    },
    error: (result) => {
      this.snackBar.open('Update failed: ' + result.error, 'OK', { duration: 2000 });
    }
  });
}

  // Remove favorite movie
  removeFavourite(movieId: string): void {
    const username = localStorage.getItem('user') || '';
    this.fetchApiData.deleteFavouriteMovie(username, movieId).subscribe(() => {
      this.favouriteMovies = this.favouriteMovies.filter(
        (m) => m._id !== movieId
      );
    });
  }

  // Open dialogs like Director, Genre, Synopsis on movie cards
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorComponent, { data: director });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreComponent, { data: genre });
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(MovieSynopsisComponent, { data: movie });
  }
}
