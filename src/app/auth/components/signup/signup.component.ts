import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  isSpinning: boolean = false;
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  confirmationValidator = (control: FormGroup): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  isRegisteredEmail(email: string) {
    if (!email) return;

    this.authService.checkEmailExists(email).subscribe((res) => {
      if (res) {
        this.signupForm.get('email')!.setErrors({ emailExists: true });
      }
    });
  }

  register() {
    this.authService.register(this.signupForm.value).subscribe(
      (response) => {
        if (!response.id) {
          return;
        }
        this.message.success('Successfully signed up!', { nzDuration: 3000 });
        this.router.navigateByUrl('/login');
      },
      (error) => {
        this.message.error('Failed to sign up!', { nzDuration: 3000 });
      }
    );
  }
}
