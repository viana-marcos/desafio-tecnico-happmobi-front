import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../../../core/services/app.service';
import { CarService } from '../../../core/services/car.service';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allocation',  
  templateUrl: './allocation.component.html',
  styleUrl: './allocation.component.scss'
})
export class AllocationComponent {
  carList: any = [{}];
  isLoader = false;
  pages = 0;
  dataFilter = {
    page:0,
    size:4
  };

  user: any;

  constructor(private userService: UserService, private carService: CarService, private appService: AppService,
     private snackBar: MatSnackBar, private router: Router) {}

  async ngOnInit(): Promise<void> {
    const loggedUser = localStorage.getItem('authToken') || '';
    this.user = this.userService.decodeJwt(loggedUser);
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

  allocationConfirmation(carId: string, carName: string) {
    const confirmationSubject = this.appService.openDialog("Tem certeza em reservar " + carName);
    confirmationSubject.subscribe(async () => {
       await this.toReserve(carId);
    });
  }

   async toReserve(carId: string) {
    try {
      this.isLoader = true;
      await this.carService.toReserve(carId, this.user.sub);
      setTimeout(async () => {
        this.appService.showToast("Reserva feita com sucesso");        
        this.isLoader = false;
        this.router.navigate(['/leasing-area/home']);
              
      }, 1000)
    } catch (error: any) {
      setTimeout(() => {
        this.isLoader = false;
      }, 1000)

    }
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
