import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit{


  @Input()
  editUser: any;

  private fb: FormBuilder = inject(FormBuilder);

  @Output() formEvent = new EventEmitter<any>();

  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    userName: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
    picture: ['', Validators.required]
  }, { validators: this.checkPasswords });

  ngOnInit(): void {
    if(this.editUser){
      this.userForm.patchValue(this.editUser);
    } 
  }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const passwordConfirm = group.get('repeatPassword')?.value;
    return password === passwordConfirm ? null : { notSame: true }
  }
  onFileSelected(event: any): void {
    const file = event?.target?.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.userForm.get('picture')?.setValue(reader.result);
    }
  }

}


