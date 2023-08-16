import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthResponse } from 'src/app/models/AuthResponse';
import { Patient } from 'src/app/models/Patient';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  patientForm: FormGroup;
  patients: Array<Patient> = [];
  loginDetails: AuthResponse = {};
  private isLoggedInSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private _snack: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: [null, [Validators.required]],
      gender: ['', [Validators.required]],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
    });

    this.patientService
      .getAllPatients()
      .subscribe((patients) => (this.patients = patients));

    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (loggedInUser) => {
        this.loginDetails = loggedInUser;
      }
    );
  }

  addPatient() {
    const patient: Patient = {
      firstName: this.patientForm.get('firstName').value,
      contactNumber: this.patientForm.get('contactNumber').value,
      dob: this.patientForm.get('dob').value,
      gender: this.patientForm.get('gender').value,
    };

    this.patientService.addPatient(patient).subscribe((values) => {
      this.patients = values;
      this._snack.open('Patient added', 'cancel');
    });
  }

  deletePatient(id: number) {
    this.patientService.deletePatient(id).subscribe((values) => {
      this.patients = values;
      this._snack.open('Patient delete', 'cancel');
    });
  }
}
