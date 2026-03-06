import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  name = '';
  password = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async login(): Promise<void> {
    const username = this.name.trim();
    const pass = this.password.trim();

    if (!username || !pass) {
      alert('Please enter login details');
      return;
    }

    try {
      const isValid = await this.authService.validateLogin(username, pass);

      if (!isValid) {
        alert('Invalid name or password');
        return;
      }

      this.authService.markLoggedIn();
      alert('Login successful');
      await this.router.navigate(['/home']);
    } catch {
      alert('Unable to connect to Firebase. Please check firebase config.');
    }
  }
}
