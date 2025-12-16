import { Component, inject, OnInit } from '@angular/core';
import { CarService } from '../../../core/services/car.service';
import { AppService } from '../../../core/services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})
export class CarListComponent implements OnInit {

  carList: any = [{}];
  isLoader = false;
  pages = 0;
  dataFilter = {
    page:0,
    size:4
  };

  constructor(private carService: CarService, private appService: AppService, private snackBar: MatSnackBar) {}

  async ngOnInit(): Promise<void> {
    await this.getListCars();
  }

  removalConfirmation(carId: string) {
    const confirmationSubject = this.appService.openDialog("Tem certeza em remover esse veiculo");
    confirmationSubject.subscribe(async () => {
      await this.removeCar(carId);
    });
  }

  async removeCar(carId: string) {
    this.isLoader = true;
    await this.carService.delete(carId);
    this.hideLoader();
    this.appService.showToast('Veiculo removido com sucesso');
    await this.getListCars();
  }

  async getListCars() {
    try {
      this.isLoader = true;
      const response = await this.carService.getCarList(this.dataFilter);
      this.pages =response.pages;
      this.carList = response.list;
      this.hideLoader();
    } catch (error: any) {
      this.hideLoader();
    }

  }

  hideLoader() {
    setTimeout(() => {
      this.isLoader = false;
    }, 1000)
  }

  async filterCars(filters: any) {
    this.dataFilter = {
      ...this.dataFilter,
      ...filters
    }
    await this.getListCars();
  }

  async changePage(page: number){
    this.dataFilter.page = page;
    await this.getListCars();
  }

}
