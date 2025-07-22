import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatButtonModule } from '@angular/material/button';

/**
 * The `WelcomePageComponent` is the landing view for unauthenticated users.
 * It provides options to either register or log in, and redirects to the movies page if already logged in.
 */
@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  /**
   * Creates an instance of WelcomePageComponent.
   * @param dialog Angular Material dialog service used to open registration and login forms.
   * @param router Angular Router used to navigate the user to other routes.
   */
  constructor(public dialog: MatDialog, private router: Router) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Checks for an existing token in localStorage and redirects authenticated users to the movies page.
   */
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/movies']);
    }
  }

  /**
   * Opens the user registration form in a modal dialog.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  /**
   * Opens the user login form in a modal dialog.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
