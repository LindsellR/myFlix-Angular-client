import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true, //Opting for standalone modules eliminates need for ngModules
  selector: 'app-root',
  imports: [
    RouterOutlet,      // Enables routing between views
    HeaderComponent,   // Persistent app-wide header
    CommonModule       // Includes structural directives like *ngIf, *ngFor
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Determines if the user is currently authenticated based on the presence of a token in localStorage.
   */
  get isLoggedIn(): boolean {
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }
}
