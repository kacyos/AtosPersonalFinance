import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
})
export class CreateAccountComponent {
  constructor(private accountService: AccountService, private router: Router) {}
  createAccountForm: FormGroup = new FormGroup({});
  toast = { type: '', message: '' };

  ngOnInit() {
    if (this.accountService.isUserLoggedIn()) {
      this.router.navigate(['home']);
    }

    this.createAccountForm = new FormGroup(
      {
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
        ]),
      },
      { validators: this.passwordMatchValidator.bind(this) }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = this.createAccountForm.get('password');
    const confirmPassword = this.createAccountForm.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { mismatch: true }
      : null;
  }

  onSubmit() {
    if (!this.createAccountForm.valid) {
      this.openToast('bg-danger', 'Verifique os campos do formulário');
      return;
    }

    if (this.createAccountForm.hasError('mismatch')) {
      this.openToast('bg-danger', 'As senhas não conferem');
      return;
    }

    this.createAccount();
  }

  createAccount() {
    const { username, password } = this.createAccountForm.value;
    this.accountService
      .createAccount({ userName: username, password })
      .subscribe(
        () => {
          this.openToast('bg-success', 'Conta criada com sucesso');
          this.router.navigate(['login']);
        },
        () => {
          this.openToast('bg-danger', 'Usuário já cadastrado');
        }
      );
  }

  openToast(type: string, message: string) {
    this.toast.type = type;
    this.toast.message = message;

    const toast = document.querySelectorAll('.toast');

    toast.forEach((element) => {
      const toastBootstrap = Toast.getOrCreateInstance(element, {
        animation: true,
        autohide: true,
        delay: 3000,
      });
      toastBootstrap.show();
    });
  }

  get username() {
    return this.createAccountForm.get('username')!;
  }
  get password() {
    return this.createAccountForm.get('password')!;
  }
  get confirmPassword() {
    return this.createAccountForm.get('confirmPassword')!;
  }
}
