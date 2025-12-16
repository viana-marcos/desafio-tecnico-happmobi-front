import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../core/services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.scss'
})
export class CarFormComponent implements OnInit {

  message: string = '';
  isLoader = false;
  typesBodiesOptions: any = [];
  engineTypeOptions: any = [];
  numbeSeatsOptions: any = [];
  carId: string = '';

  constructor(private carService: CarService, private activateRoute: ActivatedRoute,
    private router: Router, private snackBar: MatSnackBar) {
    this.typesBodiesOptions = carService.typesBodiesOptions;
    this.engineTypeOptions = carService.engineTypeOptions;
    this.numbeSeatsOptions = carService.numbeSeatsOptions;
  }

  async ngOnInit(): Promise<void> {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id) {
      this.carId = id;
      this.isLoader = true;
      const car = await this.carService.getCarById(id);
      this.carForm.patchValue(car);
      this.hideLoader();
    }

  }

  private fb: FormBuilder = inject(FormBuilder);

  carForm: FormGroup = this.fb.group({
    modelName: ['', Validators.required],
    bodyType: ['', Validators.required],
    engineType: ['', [Validators.required]],
    numberOfSeats: ['', Validators.required],
    picture: ['', Validators.required]
  });

  onFileSelected(event: any): void {
    const file = event?.target?.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.carForm.get('picture')?.setValue(reader.result);
    }
  }

  public async save() {

    try {
      this.isLoader = true;
      this.message = '';
      this.hideLoader();
      if (this.carId) {
        await this.carService.update(this.carId, this.carForm.value);
      } else {
        await this.carService.save(this.carForm.value);
      }

      this.router.navigate(['/admin-area/car-list']);
      this.showToast();

    } catch (error: any) {
      this.message = error.error.message;
      this.hideLoader();
    }
  }

  hideLoader() {
    setTimeout(() => {
      this.isLoader = false;
    }, 1000)
  }

  showToast() {
    this.snackBar.open('Veiculo salvo com sucesso', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
