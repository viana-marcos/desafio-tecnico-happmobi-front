import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { AllocationComponent } from './allocation/allocation.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'allocation',
    component:AllocationComponent
  },
 
  {
    path: 'edit-account',
    component: EditAccountComponent
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
export class LeasingAreaRoutingModule { }
