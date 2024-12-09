import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { ErrorPipe } from '../pipes/error.pipe';

import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'cp-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatIconModule,
    ErrorPipe,
    MatProgressSpinner,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string | null = null;

  isLoading: boolean = false;

  convenienceCreds = {
    email: 'eve.holt@reqres.in',
    pass: 'thiscanbeanything',
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [this.convenienceCreds.email, [Validators.required, Validators.email]],
      password: [this.convenienceCreds.pass, Validators.required],
      isAdmin: [false],
    })
  }

  onSubmit() {
    this.error = null;

    if (this.loginForm.invalid) {
      this.markAllAsTouched(this.loginForm);
    } else {
      this.isLoading = true;

      const creds = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }

      this.loginService.login(creds).subscribe({
        next: (response) => {
          this.authService.setLocalStorage(response, this.loginForm.get('isAdmin')?.value);

          this.isLoading = false;
          this.router.navigate(['']);
        },
        error: (err) => {
          this.isLoading = false;

          console.error('Login failed', err);
          this.error = err.error.error


        }
      })
    }
  }

  private markAllAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markAllAsTouched(control);
      }
    });
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
