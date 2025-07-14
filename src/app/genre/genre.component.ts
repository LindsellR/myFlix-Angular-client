// src/app/genre/genre.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [
    CommonModule,      // Angular common directives
    MatDialogModule,   // Angular Material Dialog features
    MatButtonModule    // Angular Material Buttons
  ],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.scss'
})
export class GenreComponent {
  /**
   * Data injected by the dialog opener, containing genre details.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GenreComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
