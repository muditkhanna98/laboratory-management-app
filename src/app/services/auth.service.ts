import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedInSubject = new BehaviorSubject<AuthResponse>({});
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(
    username: string,
    password: string,
    role: string
  ): Observable<AuthResponse> {
    const user = { username: username, password: password, role: role };
    return this.http.post<AuthResponse>('url/api/auth/register', user);
  }

  loginUser(username: string, password: string): Observable<AuthResponse> {
    const user = { username: username, password: password };
    return this.http.post<AuthResponse>('url/api/auth/authenticate', user);
  }
}
