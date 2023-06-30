import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CreateAccountComponent } from './pages/account/create-account/create-account.component';
import { AuthenticationComponent } from './components/layout/authentication/authentication.component';
import { LoginComponent } from './pages/account/login/login.component';
import { HomeComponent } from './components/layout/home/home.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

import {
  NgxMaskDirective,
  NgxMaskPipe,
  provideEnvironmentNgxMask,
} from 'ngx-mask';
import { httpInterceptorProviders } from './http-interceptors';
import { ModalEditTransactionComponent } from './components/modal/edit-transaction/edit-transaction.component';
import { FormCreateTransactionComponent } from './components/forms/create-transacrion/create-transaction.component';
import { FormEditTransactionComponent } from './components/forms/edit-transaction/edit-transaction.component';
import { ToastComponent } from './components/toast/toast.component';
import { formatCurrencyBRL } from './pipes/format-currency-BRL.pipe';
import { ConfirmComponent } from './components/modal/confirm/confirm.component';
import { ReportsComponent } from './pages/reports/report.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    DashBoardComponent,
    LoginComponent,
    CreateAccountComponent,
    TransactionsComponent,
    ModalEditTransactionComponent,
    FormCreateTransactionComponent,
    FormEditTransactionComponent,
    ToastComponent,
    formatCurrencyBRL,
    ConfirmComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [httpInterceptorProviders, provideEnvironmentNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
