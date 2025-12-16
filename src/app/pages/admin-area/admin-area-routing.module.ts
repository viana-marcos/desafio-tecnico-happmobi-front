import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarFormComponent } from './car-form/car-form.component';
import { CarListComponent } from './car-list/car-list.component';

const routes: Routes = [
  {
    path: 'new-car',
    component: CarFormComponent, pathMatch: 'full'
  },
  {
    path: 'edit-car/:id',
    component: CarFormComponent
  },
  {
    path: 'car-list',
    component: CarListComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAreaRoutingModule { }
