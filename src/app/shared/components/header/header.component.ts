import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,  
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input()
  title: string = '';

  constructor(private router: Router) { }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
