import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginRequest } from '../../models/login-request';
import { AuthenticationResponse } from '../../models/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/auth';

  login(request: LoginRequest): Observable<AuthenticationResponse> {

    return this.http.post<AuthenticationResponse>(
      `${this.apiUrl}/login`,
      request
    );

  }

  register(request: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      request
    );

  }

  logout() {

  localStorage.removeItem('token');

}

}