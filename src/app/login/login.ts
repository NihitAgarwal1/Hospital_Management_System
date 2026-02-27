import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
     name: string = '';
    password: string = '';
    constructor(private router: Router) {}

  login() {
    if (this.name && this.password) {
      this.router.navigate(['/home']);
    } else {
      alert('Please enter login details');
    }
  }

}
