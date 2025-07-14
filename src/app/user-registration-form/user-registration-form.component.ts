// src/app/user-registration-form/user-registration-form.component.ts

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
  // Input property for initial user data 
  @Input() userData: User = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  // Inject services:
  // fetchApiData - to call the registration API
  // dialogRef - to control the open registration dialog
  // snackBar - to show feedback messages to the user
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  // Lifecycle hook: called after component initialization
  ngOnInit(): void {}

  // Method triggered when user registers
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        // On success:
        // Close the dialog modal
        this.dialogRef.close();

       
        console.log(result);

        // Welcome message with username
        this.snackBar.open(`Welcome, ${result.Username}!`, 'OK', {
          duration: 2000, 
        });
      },
      (result) => {
        
        
        console.log(result);

        // Show error message in snackbar 
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
