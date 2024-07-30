import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model: any = {};
  error = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.authService.login(this.model.username, this.model.password)
      .subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/tasks'])
              .then(() => {
                console.log("Login successfully");
              })
              .catch(err => {
                console.error('Navigation error:', err);
              });
          } else {
            this.error = 'Username or password is incorrect';
          }
        },
        error: (error) => {
          this.error = 'An error occurred during login';
        }
      });
  }
}
