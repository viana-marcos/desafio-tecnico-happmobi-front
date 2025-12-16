import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../core/services/app.service';
import { UserService } from '../../../core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarService } from '../../../core/services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  loggedUser: any
  isLoader = false;

  constructor(private userService: UserService, private appService: AppService,
    private router: Router, private snackBar: MatSnackBar, private carService: CarService) { }

  async ngOnInit(): Promise<void> {
    const loggedUser = localStorage.getItem('authToken') || '';
    const user = this.userService.decodeJwt(loggedUser);
    this.loggedUser = await this.userService.getById(user.sub);
  }

  removalConfirmation() {
    const confirmationSubject = this.appService.openDialog("Tem certeza que deseja remover esta conta");
    confirmationSubject.subscribe(async () => {
      await this.removeAccount();
    });
  }

  endAllocationConfirmation(carId: string) {
    const confirmationSubject = this.appService.openDialog("Tem certeza em finalizar reservar ");
    confirmationSubject.subscribe(async () => {
      await this.andReserve(carId);
    });
  }

  async andReserve(carId: string) {
    try {
      this.isLoader = true;
      await this.carService.endReserve(carId, this.loggedUser._id);
      setTimeout(async () => {
        this.appService.showToast("Reserva encerrada com sucesso");        
        this.isLoader = false;
        this.loggedUser = await this.userService.getById(this.loggedUser._id);        
      }, 1000)
    } catch (error: any) {
      setTimeout(() => {
        this.isLoader = false;
      }, 1000)

    }
  }

  async removeAccount() {

    try {
      this.isLoader = true;

      await this.userService.removeAccount(this.loggedUser._id);

      setTimeout(() => {
        this.appService.showToast("Conta removida com sucesso");
        localStorage.clear()
        this.router.navigate(['/login']);
        this.isLoader = false;
      }, 3000)
    } catch (error: any) {
      setTimeout(() => {
        this.isLoader = false;
      }, 3000)
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
