// main.server.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

// Core Angular Providers
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

/**
 * Bootstraps the Angular application in a server-side rendering (SSR) context.
 * This file is used during SSR to generate HTML on the server before sending it to the client.
 */
const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),         // Enables HTTP requests server-side
      provideAnimations(),         // Enables Angular animations (no-op on server but required)
      provideRouter([]),           // Empty route config for SSR (can be customized if needed)
    ],
  });

export default bootstrap;
