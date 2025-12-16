import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../core/services/user.service';
import { AppService } from '../../core/services/app.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [SharedModule],
  providers: [UserService, AppService],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent {

  message: string = '';

  isLoader = false;

  constructor(private userService: UserService,
    private router: Router,
     private appService: AppService) { }

  public async saveUser(formValue: any) {

    try {
      this.isLoader = true;
      this.message = '';
      await this.userService.save(formValue) ;  
      setTimeout(() => {
        this.isLoader = false;
        this.appService.showToast("Conta criada com sucesso");
        this.router.navigate(['/login']);
      }, 3000)
    } catch (error: any) {
      this.message = error.error.message;
      setTimeout(() => {
        this.isLoader = false;
      }, 3000)
    }
  }

}
