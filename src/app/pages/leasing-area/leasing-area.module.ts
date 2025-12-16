import { NgModule } from '@angular/core';
import { LeasingAreaRoutingModule } from './leasing-area-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { HomeComponent } from './home/home.component';
import { AllocationComponent } from './allocation/allocation.component';
import { CarService } from '../../core/services/car.service';

@NgModule({
  declarations: [EditAccountComponent, HomeComponent, AllocationComponent],
  imports: [
    LeasingAreaRoutingModule,
    SharedModule
  ],
  providers: [CarService]
})
export class LeasingAreaModule { }
