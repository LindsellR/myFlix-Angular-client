// src/app/director/director.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-director',
  standalone: true,
  imports: [
    CommonModule,       // Common Angular directives 
    MatDialogModule,    // Material dialog support
    MatButtonModule     // Material buttons
  ],
  templateUrl: './director.component.html',
  styleUrl: './director.component.scss'
})
export class DirectorComponent {
  /**
   * Receives director data injected from the dialog opener.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DirectorComponent>
  ) {}

 
  closeDialog(): void {
    this.dialogRef.close();
  }
}
