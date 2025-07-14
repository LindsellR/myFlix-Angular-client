import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie-synopsis',
  standalone: true,
  imports: [
     CommonModule,      // Angular common directives
    MatDialogModule,   // Angular Material Dialog features
    MatButtonModule    // Angular Material Buttons
  ],
  templateUrl: './movie-synopsis.component.html',
  styleUrl: './movie-synopsis.component.scss',
})
export class MovieSynopsisComponent {
  /**
   * Data injected by the dialog opener, containing movie synopsis details.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

    public dialogRef: MatDialogRef<MovieSynopsisComponent>
  ) {
    console.log(this.data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
