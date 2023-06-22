import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent, CreateAccountComponent],
  imports: [HttpClientModule, CommonModule],
})
export class AccountModule {}
