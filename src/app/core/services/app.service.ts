import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AppService {

   readonly dialog = inject(MatDialog);

  constructor(private snackBar: MatSnackBar) {}

  openDialog(message: string): any {
    const enterAnimationDuration = '300ms';
    const exitAnimationDuration = '100ms';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '270px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        message: message,
      }
    }) as any;
    return dialogRef.componentInstance.confirmationSubject;  
  }

   showToast(message: string) {
    this.snackBar.open(message, '', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}