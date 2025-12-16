import { NgModule } from '@angular/core';
import { AdminAreaRoutingModule } from './admin-area-routing.module';
import { CarFormComponent } from './car-form/car-form.component';
import { SharedModule } from "../../shared/shared.module";
import { CarService } from '../../core/services/car.service';
import { CarListComponent } from './car-list/car-list.component';

@NgModule({
  declarations: [CarFormComponent, CarListComponent],
  imports: [
    AdminAreaRoutingModule,
    SharedModule
  ],
  providers: [CarService]

})
export class AdminAreaModule { }
