import { Injectable } from '@angular/core';
import { User } from '../../../types';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string {
    return window.localStorage.getItem(TOKEN) || '';
  }

  static getUser(): User {
    return JSON.parse(window.localStorage.getItem(USER) || '{}');
  }

  static getUserRole(): string {
    return JSON.parse(window.localStorage.getItem(USER) || '{}').userRole;
  }

  static isAdminLoggedIn(): boolean {
    if (!this.getToken()) {
      return false;
    }
    return this.getUserRole() === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    if (!this.getToken()) {
      return false;
    }
    return this.getUserRole() === 'CUSTOMER';
  }
}
