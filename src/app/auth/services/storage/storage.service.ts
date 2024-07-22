import { User } from "../../../types";

export class StorageService {
  private static isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  static saveToken(token: string): void {
    if (this.isBrowser()) {
      window.sessionStorage.setItem('token', token);
    }
  }

  static getToken(): string | null {
    if (this.isBrowser()) {
      return window.sessionStorage.getItem('token');
    }
    return null;
  }

  static clearUserStorage(): void {
    if (this.isBrowser()) {
      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('user');
    }
  }

  static saveUser(user: User): void {
    if (this.isBrowser()) {
      window.sessionStorage.setItem('user', JSON.stringify(user));
    }
  }

  static getUser(): User | null {
    if (this.isBrowser()) {
      const user = window.sessionStorage.getItem('user');
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
    return user ? user.userRole === 'Admin' : false;
  }

  static isCustomerLoggedIn(): boolean {
    const user = this.getUser();
    return user ? user.userRole === 'Customer' : false;
  }
}
