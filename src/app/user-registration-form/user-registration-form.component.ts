import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FetchApiDataService } from '../fetch-api-data.service';
import { User } from '../models/user.model';

/**
 * The `UserRegistrationFormComponent` provides a registration form
 * that allows users to sign up by entering their details.
 * On successful registration, a welcome message is shown and the dialog closes.
 */
@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * User data entered in the registration form.
   */
  @Input() userData: User = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   * @param fetchApiData Service for making HTTP requests to the backend API.
   * @param dialogRef Reference to the registration dialog, used to close it on success.
   * @param snackBar Service to display notifications to the user.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Registers a new user by sending the user data to the backend.
   * On success: closes the modal and displays a welcome message.
   * On failure: logs the error and displays a snackbar error message.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        this.dialogRef.close(); // Close the dialog on success

        console.log(result);

        this.snackBar.open(`Welcome, ${result.Username}!`, 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        console.log(result);

        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
