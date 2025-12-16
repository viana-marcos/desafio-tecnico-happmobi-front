import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { AppService } from '../../../core/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-account',  
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss'
})
export class EditAccountComponent implements OnInit{

  message: string = '';

  isLoader = false;
  editUser: any ;

  constructor(private userService: UserService, private appService: AppService,
     private router: Router, private ref: ChangeDetectorRef,) { }

  async ngOnInit() {
    const loggedUser = localStorage.getItem('authToken') || '';
    const user = this.userService.decodeJwt(loggedUser);
    this.editUser = await this.userService.getById(user.sub);  
  }

  public async update(formValue: any) {

    try {
      this.isLoader = true;
      this.message = '';
      await this.userService.update(this.editUser._id, formValue);         
        
      setTimeout(() => {
        this.appService.showToast("Conta atualizada com sucesso");
        this.router.navigate(['/leasing-area/home']);
        this.isLoader = false;
      }, 3000)
    } catch (error: any) {
      this.message = error.error.message;
      setTimeout(() => {
        this.isLoader = false;
      }, 3000)
    }
  }

}
