import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = 'admin';
  password: string = 'admin';

  constructor(private router: Router) {}

  onLogin() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/dashboard']); 
    } else {
      // Handle invalid login
      alert('Invalid credentials');
    }
  }
}
