import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
})
export class CreateAccountComponent {
  constructor(private accountService: AccountService, private router: Router) {}
  createAccountForm!: FormGroup;

  ngOnInit() {
    if (this.accountService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }

    this.createAccountForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.passwordMatchValidator.bind(this),
      ]),
    });
  }

  passwordMatchValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    if (control.value !== this.createAccountForm?.get('password')?.value) {
      return { notMatch: true };
    }
    return null;
  }

  onSubmit() {}

  get username() {
    return this.createAccountForm.get('username');
  }
  get password() {
    return this.createAccountForm.get('password');
  }
  get confirmPassword() {
    return this.createAccountForm.get('confirmPassword');
  }
}
