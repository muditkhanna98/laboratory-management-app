import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/AuthResponse';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _snack: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login() {
    const username = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;

    this.authService.loginUser(username, password).subscribe(
      (value: AuthResponse) => {
        this._snack.open('Login successful', 'Close');
        localStorage.setItem('user', JSON.stringify(value));
        this.authService.isLoggedInSubject.next(value);
        this.router.navigate(['/home']);
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message);
        this._snack.open(error.error.message, 'Close');
      }
    );
  }
}
