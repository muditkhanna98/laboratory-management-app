import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/Patient';
import { Result } from '../models/Result';
import { Observable } from 'rxjs';
import { Appointment } from '../models/Appointment';
import { CreateTest } from '../models/CreateTest';
import { CreateTestResult } from '../models/CreateTestResult';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<any> {
    const storedData = JSON.parse(localStorage.getItem('user'));
    const token = storedData.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.get('url/api/patient', httpOptions);
  }

  addPatient(patient: Patient): Observable<any> {
    const storedData = JSON.parse(localStorage.getItem('user'));
    const token = storedData.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.post('url/api/patient', patient, httpOptions);
  }

  deletePatient(id: number): Observable<any> {
    const storedData = JSON.parse(localStorage.getItem('user'));
    const token = storedData.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.delete(`url/api/patient/delete/${id}`, httpOptions);
  }

  addAppointment(data: Appointment): Observable<any> {
    const storedData = JSON.parse(localStorage.getItem('user'));
    const token = storedData.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.post('url/api/appointment', data, httpOptions);
  }

  getAllAppointments(): Observable<any> {
    const storedData = JSON.parse(localStorage.getItem('user'));
    const token = storedData.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.get('url/api/appointment', httpOptions);
  }

  getAllTests(): Observable<any> {
    const storedData = JSON.parse(localStorage.getItem('user'));
    const token = storedData.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.get('url/api/tests', httpOptions);
  }

  assignTest(obj: CreateTest): Observable<any> {
    const storedData = JSON.parse(localStorage.getItem('user'));
    const token = storedData.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post('url/api/test-orders', obj, httpOptions);
  }

  getAllTestOrders(): Observable<any> {
    const storedData = JSON.parse(localStorage.getItem('user'));
    const token = storedData.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.get('url/api/test-orders', httpOptions);
  }

  saveTestResult(result: CreateTestResult): Observable<any> {
    const storedData = JSON.parse(localStorage.getItem('user'));
    const token = storedData.token;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };

    return this.http.post('url/api/test-results', result, httpOptions);
  }
}
