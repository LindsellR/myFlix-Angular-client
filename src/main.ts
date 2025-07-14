// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

// Core Angular providers
import { provideHttpClient } from '@angular/common/http';                
import { provideAnimations } from '@angular/platform-browser/animations'; 
import { provideRouter } from '@angular/router';                        
import { routes } from './app/app.routes';                              

/**
 * Bootstraps the Angular application using standalone APIs 
 */

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),        // Adds HTTP communication capabilities
    provideAnimations(),        // Enables animation support (e.g. Angular Material)
    provideRouter(routes),      // Applies the app's route configuration
  ],
}).catch(err => console.error(err)); // Logs any errors during bootstrap
