import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarService } from '../../../core/services/car.service';

@Component({
  selector: 'app-car-filter-form',
  templateUrl: './car-filter-form.component.html',
  styleUrl: './car-filter-form.component.scss'
})
export class CarFilterFormComponent {

  typesBodiesOptions: any = [];
  engineTypeOptions: any = [];
  numbeSeatsOptions: any = [];

  private fb: FormBuilder = inject(FormBuilder);

  @Output() formEvent = new EventEmitter<any>();

  constructor(private carService: CarService,) { 
    this.typesBodiesOptions = carService.typesBodiesOptions;
    this.engineTypeOptions = carService.engineTypeOptions; 
    this.numbeSeatsOptions = carService.numbeSeatsOptions; 
  }

  filterForm: FormGroup = this.fb.group({
    modelName: [''],
    bodyType: [''],
    engineType: [''],
    numberOfSeats: [''],
  });

}
