import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CarFilterFormComponent } from './components/car-filter-form/car-filter-form.component';
import { PaginationComponent } from './components/pagination/pagination.component';


@NgModule({
 imports: [MatSnackBarModule]
})
export class AppModule {}

const MODULES = [CommonModule, RouterLink, FormsModule, ReactiveFormsModule];
const MATERIAL_MODULES = [MatButtonModule, MatGridListModule, MatMenuModule, MatIconModule, MatSnackBarModule, MatDialogModule, MatTooltipModule, MatChipsModule];

const DECLARATIONS = [HeaderComponent, UserFormComponent, LoadingSpinnerComponent, ConfirmationDialogComponent, CarFilterFormComponent, PaginationComponent];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    ...MODULES,
    ...MATERIAL_MODULES
  ],

  exports: [
    ...MODULES,
    ...MATERIAL_MODULES,
    ...DECLARATIONS
  ]
})
export class SharedModule { }
