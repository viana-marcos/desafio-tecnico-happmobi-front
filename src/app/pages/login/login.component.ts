import { Component, inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { FormBuilder } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  message: string = '';  

  isLoader = false;

  private fb: FormBuilder = inject(FormBuilder);

  constructor(private userService: UserService, private router: Router) { }

  loginForm: FormGroup = this.fb.group({
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  public async signIn() {

    try {
      this.isLoader = true;
      this.message = '';
      const response = await this.userService.signIn(this.loginForm.value);
      const user = await this.userService.decodeJwt(response.access_token)
      
      localStorage.clear();    
      localStorage.setItem('authToken', response.access_token);     

      setTimeout(() => {
        this.isLoader = false;
        if(user.admin){
          this.router.navigate(['/admin-area/car-list']);
        }else{
          this.router.navigate(['/leasing-area/home']);
        }
        
      }, 3000)
    } catch (error: any) {
      this.message = error.error.message;
      setTimeout(() => {
        this.isLoader = false;
      }, 3000)
    }
  }

}
