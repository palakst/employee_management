import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly mockUsers = [
    { username: 'employee1', password: 'pass123', role: 'employee' },
    { username: 'manager1', password: 'pass123', role: 'manager' },
  ];

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const user = this.mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getUserRole(): string {
    return this.getCurrentUser()?.role || '';
  }
}
