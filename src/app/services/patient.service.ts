import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/Patient';
import { Observable } from 'rxjs';

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
}
