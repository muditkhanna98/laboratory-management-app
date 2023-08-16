import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/AuthResponse';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css'],
})
export class RegisterationComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _snack: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
      role: [null, Validators.required],
    });
  }

  register() {
    const username = this.registerForm.get('userName').value;
    const password = this.registerForm.get('password').value;
    const role = this.registerForm.get('role').value;

    this.authService.registerUser(username, password, role).subscribe(
      (value: AuthResponse) => {
        this._snack.open(
          'User registered with username: ' + value.username,
          'Close'
        );
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message);
        this._snack.open(
          'Error registering user: ' + error.error.message,
          'Close'
        );
      }
    );
  }
}
