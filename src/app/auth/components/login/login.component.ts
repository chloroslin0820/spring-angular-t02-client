import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../../types';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isSpinning: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (res: User) => {
        if (res.userId != null) {
          const user: User = {
            jwt: res.jwt,
            userId: res.userId,
            userRole: res.userRole,
          };
          StorageService.saveUser(user);
          StorageService.saveToken(user.jwt);

          if (StorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('/admin/dashboard');
          } else if (StorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('/customer/dashboard');
          } else {
            this.message.error('Bad Credentials', { nzDuration: 5000 });
          }
        }
      },
      (error) => {
        this.message.error(
          'Login failed, Please check your email or password',
          { nzDuration: 5000 }
        );
      }
    );
  }
}
