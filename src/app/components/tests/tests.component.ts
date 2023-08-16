import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/models/Appointment';
import { AuthResponse } from 'src/app/models/AuthResponse';
import { CreateTest } from 'src/app/models/CreateTest';
import { Patient } from 'src/app/models/Patient';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css'],
})
export class TestsComponent implements OnInit {
  loginDetails: AuthResponse = {};
  private isLoggedInSubscription: Subscription;
  patients: Array<Patient> = [];
  appointments: Array<Appointment> = [];

  tests = [];
  orders = [];
  test: FormGroup;

  constructor(
    private patientService: PatientService,
    private _snack: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.test = new FormGroup({
      testName: new FormControl('', Validators.required),
    });

    this.isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      (loggedInUser) => {
        this.loginDetails = loggedInUser;
      }
    );

    this.patientService
      .getAllPatients()
      .subscribe((patients) => (this.patients = patients));

    this.patientService
      .getAllTests()
      .subscribe((values) => (this.tests = values));

    this.getAllTestOrders();
    this.getAllAppointments();
  }

  getAllAppointments() {
    this.patientService
      .getAllAppointments()
      .subscribe(
        (values) =>
          (this.appointments = values.sort(
            (a, b) =>
              new Date(a.appointmentDatetime).getTime() -
              new Date(b.appointmentDatetime).getTime()
          ))
      );
    console.log(this.appointments);
  }

  assignTest(id: number) {
    console.log(this.test.get('testName').value);
    const obj: CreateTest = {
      patient: { patientId: id },
      medical_user: {
        username: this.loginDetails.username,
      },
      test: { testId: parseInt(this.test.get('testName').value) },
      orderDateTime: new Date(),
      status: 'pending',
    };

    this.patientService.assignTest(obj).subscribe((value) => {
      console.log(value);
      this._snack.open('Test order created successfully', 'cancel');
    });
  }

  getAllTestOrders() {
    this.patientService.getAllTestOrders().subscribe((values) => {
      this.orders = values;
    });

    console.log(this.orders);
  }
}
