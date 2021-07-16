import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { ErrorMessageType } from '../file-loader/file-loader.component';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-replace-catalog',
  templateUrl: './replace-catalog.component.html',
    styleUrls: ['./replace-catalog.component.scss', '../../../styles/common_dialog.components.scss']
})
export class ReplaceCatalogComponent {

  public isLoadedFile: boolean = false;
  private file: File;
  public errors: ErrorMessageType[] = [
    // { type: 'some', message: 'some error message' },
    // { type: 'some', message: 'some error message' },
    // { type: 'some', message: 'some error message' }
  ];

  constructor(
    private dialogRef: MatDialogRef<ReplaceCatalogComponent>,
    private snackbarService: SnackbarService) {
  }

  public clickHandler(): void {

  }

  public onLoad(file: File): void {
    this.file = file;
    this.isLoadedFile = true;
  }

  public checkData(): void {
    this.dialogRef.close();
    this.snackbarService.open(
      'wait',
      'Catalog Replace',
      'The file is being processed. It may take several seconds.'
    )
  }
}
