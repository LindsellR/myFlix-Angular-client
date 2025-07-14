// src/app/header/header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  /**
   * Logs the user out by clearing local storage and
   * navigating back to the welcome (login) page.
   */
  logout(): void {
    localStorage.clear();  // Clear all stored user data and tokens
    this.router.navigate(['/welcome']);  // Redirect to welcome page
  }
}
