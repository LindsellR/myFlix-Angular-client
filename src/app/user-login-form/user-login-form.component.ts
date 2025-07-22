import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * The `UserLoginFormComponent` provides a login form allowing users to authenticate
 * by entering their username and password. On successful login, it stores credentials
 * in `localStorage`, displays a confirmation message, and redirects to the movies view.
 */
@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
})
export class UserLoginFormComponent implements OnInit {
  /**
   * The credentials input by the user for login.
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Creates an instance of UserLoginFormComponent.
   * @param fetchApiData Service for handling HTTP requests to the API.
   * @param dialogRef Reference to the open login dialog, used to close it.
   * @param snackBar Snackbar service to display notifications to the user.
   * @param router Angular Router for navigating after successful login.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Sends user login data to the backend.
   * On success, stores token and username in `localStorage`,
   * shows a success message, closes the dialog, and navigates to the movies route.
   * On failure, shows an error message.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', result.user.Username);

        this.dialogRef.close(); // Close the modal on success!
        this.snackBar.open(`Login successful!`, 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open('Incorrect Username or password', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
