// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/';  // Ton backend Flask

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<any>(
      `${this.apiUrl}/login`, 
      { username, password },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        withCredentials: true
      }
    );
  }
 
  addDecideur(decideurData: any): Observable<any> {
    const headers = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
    
    return this.http.post(`${this.apiUrl}/add_decideur`, decideurData, { headers });
  }
  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  hasRole(expectedRoles: string | string[]): boolean {
    const userRole = this.getRole();
    
    if (!userRole) return false;

    if (Array.isArray(expectedRoles)) {
      return expectedRoles.includes(userRole);
    }
    return userRole === expectedRoles;
  }
  saveRole(role: string) {
    localStorage.setItem('role', role);
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  isSuperviseur(): boolean {
    return this.getRole() === 'superviseur';
  }

  isCOO(): boolean {
    return this.getRole() === 'COO';
  }

  isCPO(): boolean {
    return this.getRole() === 'CPO';
  }
 
  isSCPM(): boolean {
    return this.getRole() === 'SCPM';
  }
  isLM(): boolean {
    return this.getRole() === 'LM';
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  getAuthHeaders() {
    const token = this.getToken();
    if (token) {
      return {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
    }
    return {};
  }

  getUserInfo() {
    return this.http.get<any>(`${this.apiUrl}/auth`, this.getAuthHeaders());
  }
}
