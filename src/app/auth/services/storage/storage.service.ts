import { User } from '../../../types';

export class StorageService {
  private static isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  static saveToken(token: string): void {
    if (this.isBrowser()) {
      window.localStorage.setItem('token', token);
    }
  }

  static getToken(): string | null {
    if (this.isBrowser()) {
      return window.localStorage.getItem('token');
    }
    return null;
  }

  static clearUserStorage(): void {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
  }

  static saveUser(user: User): void {
    if (this.isBrowser()) {
      window.localStorage.setItem('user', JSON.stringify(user));
    }
  }

  static getUser(): User | null {
    if (this.isBrowser()) {
      const user = window.localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  static getUserId(): number | null {
    const user = this.getUser();
    return user ? user.userId : null;
  }

  static isAdminLoggedIn(): boolean {
    const user = this.getUser();
    if (user?.userRole == 'Admin') {
      return user.userRole === 'Admin';
    } else {
      return false;
    }
  }

  static isCustomerLoggedIn(): boolean {
    const user = this.getUser();
    if (user?.userRole == 'Customer') {
      return user.userRole === 'Customer';
    } else {
      return false;
    }
  }
}
